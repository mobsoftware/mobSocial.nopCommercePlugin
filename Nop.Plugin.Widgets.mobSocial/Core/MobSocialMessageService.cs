using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core;
using Nop.Core.Caching;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Messages;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using Nop.Services.Catalog;
using Nop.Services.Customers;
using Nop.Services.Events;
using Nop.Services.Localization;
using Nop.Services.Messages;
using Nop.Services.Stores;
using Mob.Core;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Product service
    /// </summary>
    public class MobSocialMessageService : IMobSocialMessageService
    {



        #region Fields

        /// <summary>
        /// Object context
        /// </summary>
        private readonly IRepository<GroupPage> _groupPageRepository;

        private readonly IRepository<GroupPageMember> _groupPageMemberRepository;
        private readonly IRepository<CustomerFriend> _customerFriendRepository;
        private readonly IRepository<TeamPage> _teamPageRepository;


        private ICacheManager _cacheManager;
        private readonly IWorkContext _workContext;
        private readonly IMessageTemplateService _messageTemplateService;
        private readonly IStoreService _storeService;
        private readonly IMessageTokenProvider _messageTokenProvider;
        private readonly ILanguageService _languageService;
        private readonly IStoreContext _storeContext;
        private readonly ICustomerService _customerService;
        private readonly IEventPublisher _eventPublisher;
        private readonly ITokenizer _tokenizer;
        private readonly IQueuedEmailService _queuedEmailService;
        private readonly IEmailAccountService _emailAccountService;
        private readonly EmailAccountSettings _emailAccountSettings;
        private readonly IWorkflowMessageService _workflowMessageService;
        private IProductService _productService;

        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="context">Object context</param>
        public MobSocialMessageService(IWorkContext workContext, IMessageTemplateService messageTemplateService,
                                           IStoreService storeService, IMessageTokenProvider messageTokenProvider,
                                           ILanguageService languageService,
                                           IStoreContext storeContext, ICustomerService customerService,
                                           IEventPublisher eventPublisher,
                                           ITokenizer tokenizer, IQueuedEmailService queuedEmailService,
                                           IEmailAccountService emailAccountService,
                                           EmailAccountSettings emailAccountSettings)
        {
            _workContext = workContext;
            _messageTemplateService = messageTemplateService;
            _storeService = storeService;
            _messageTokenProvider = messageTokenProvider;
            _languageService = languageService;
            _storeContext = storeContext;
            _customerService = customerService;
            _eventPublisher = eventPublisher;
            _tokenizer = tokenizer;
            _queuedEmailService = queuedEmailService;
            _emailAccountService = emailAccountService;
            _emailAccountSettings = emailAccountSettings;
        }

        #endregion



        #region Notifications
        public int SendFriendRequestNotification(Customer customer, int friendRequestCount, int languageId, int storeId)
        {

            var store = _storeService.GetStoreById(storeId);
            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("SocialNetwork.FriendRequestNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>();
            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, customer);
            tokens.Add(new Token("FriendRequestCount", friendRequestCount.ToString()));


            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);

            
            var toEmail = customer.Email;
            var toName = customer.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }

        public int SendBirthdayNotification(Customer customer, int languageId, int storeId)
        {
            throw new NotImplementedException();
        }

        public int SendEventInvitationNotification(Customer customer, int languageId, int storeId)
        {


            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("SocialNetwork.EventInvitationNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>();
            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, customer);
            
            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);

            
            var toEmail = customer.Email;
            var toName = customer.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }
        #endregion



        #region Helper Methods
        private MessageTemplate GetLocalizedActiveMessageTemplate(string messageTemplateName, int storeId)
        {
            var messageTemplate = _messageTemplateService.GetMessageTemplateByName(messageTemplateName, storeId);

            //no template found or not active
            if (messageTemplate == null || !messageTemplate.IsActive)
                return null;

            return messageTemplate;
        }

        private int EnsureLanguageIsActive(int languageId, int storeId)
        {
            //load language by specified ID
            var language = _languageService.GetLanguageById(languageId);

            if (language == null || !language.Published)
            {
                //load any language from the specified store
                language = _languageService.GetAllLanguages(storeId: storeId).FirstOrDefault();
            }
            if (language == null || !language.Published)
            {
                //load any language
                language = _languageService.GetAllLanguages().FirstOrDefault();
            }

            if (language == null)
                throw new Exception("No active language could be loaded");
            return language.Id;
        }

        private int SendNotification(MessageTemplate messageTemplate,
                                     EmailAccount emailAccount, int languageId, IEnumerable<Token> tokens,
                                     string toEmailAddress, string toName)
        {
            //retrieve localized message template data
            var bcc = messageTemplate.GetLocalized((mt) => mt.BccEmailAddresses, languageId);
            var subject = messageTemplate.GetLocalized((mt) => mt.Subject, languageId);
            var body = messageTemplate.GetLocalized((mt) => mt.Body, languageId);

            //Replace subject and body tokens 
            var subjectReplaced = _tokenizer.Replace(subject, tokens, false);
            var bodyReplaced = _tokenizer.Replace(body, tokens, true);

            var email = new QueuedEmail()
            {
                Priority = 5,
                From = emailAccount.Email,
                FromName = emailAccount.DisplayName,
                To = toEmailAddress,
                ToName = toName,
                CC = string.Empty,
                Bcc = bcc,
                Subject = subjectReplaced,
                Body = bodyReplaced,
                CreatedOnUtc = DateTime.UtcNow,
                EmailAccountId = emailAccount.Id
            };

            _queuedEmailService.InsertQueuedEmail(email);
            return email.Id;
        }

        private EmailAccount GetEmailAccountOfMessageTemplate(MessageTemplate messageTemplate, int languageId)
        {
            var emailAccounId = messageTemplate.GetLocalized(mt => mt.EmailAccountId, languageId);
            var emailAccount = _emailAccountService.GetEmailAccountById(emailAccounId);
            if (emailAccount == null)
                emailAccount = _emailAccountService.GetEmailAccountById(_emailAccountSettings.DefaultEmailAccountId);
            if (emailAccount == null)
                emailAccount = _emailAccountService.GetAllEmailAccounts().FirstOrDefault();
            return emailAccount;

        }


        #endregion

      
    }
}

    

