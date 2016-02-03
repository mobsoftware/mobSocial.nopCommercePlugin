using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Mob.Core;
using Nop.Core;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Messages;
using Nop.Core.Domain.Orders;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Plugin.Widgets.MobSocial.Extensions;
using Nop.Services.Catalog;
using Nop.Services.Customers;
using Nop.Services.Events;
using Nop.Services.Localization;
using Nop.Services.Messages;
using Nop.Services.Stores;

namespace Nop.Plugin.Widgets.MobSocial.Services
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
        private readonly IMessageTemplateService _messageTemplateService;
        private readonly IStoreService _storeService;
        private readonly IMessageTokenProvider _messageTokenProvider;
        private readonly ILanguageService _languageService;
        private readonly IStoreContext _storeContext;
        private readonly IEventPublisher _eventPublisher;
        private readonly ITokenizer _tokenizer;
        private readonly IQueuedEmailService _queuedEmailService;
        private readonly IEmailAccountService _emailAccountService;
        private readonly EmailAccountSettings _emailAccountSettings;
        private readonly ILocalizationService _localizationService;
        private readonly MessageTemplatesSettings _messageTemplateSettings;
        private readonly CatalogSettings _catalogSettings;
        private readonly IProductAttributeParser _productAttributeParser;
        private readonly IWorkContext _workContext;
        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="context">Object context</param>
        public MobSocialMessageService(IMessageTemplateService messageTemplateService,
                                           IStoreService storeService, IMessageTokenProvider messageTokenProvider,
                                           ILanguageService languageService,
                                           IStoreContext storeContext,
                                           IEventPublisher eventPublisher,
                                           ITokenizer tokenizer, IQueuedEmailService queuedEmailService,
                                           IEmailAccountService emailAccountService,
                                           EmailAccountSettings emailAccountSettings,
                                           ILocalizationService localizationService, 
                                           MessageTemplatesSettings messageTemplateSettings,
                                           CatalogSettings catalogSettings, 
                                           IProductAttributeParser productAttributeParser, IWorkContext workContext)
        {
            _messageTemplateService = messageTemplateService;
            _storeService = storeService;
            _messageTokenProvider = messageTokenProvider;
            _languageService = languageService;
            _storeContext = storeContext;
            _eventPublisher = eventPublisher;
            _tokenizer = tokenizer;
            _queuedEmailService = queuedEmailService;
            _emailAccountService = emailAccountService;
            _emailAccountSettings = emailAccountSettings;
            _localizationService = localizationService;
            _messageTemplateSettings = messageTemplateSettings;
            _catalogSettings = catalogSettings;
            _productAttributeParser = productAttributeParser;
            _workContext = workContext;
        }

        #endregion



        #region Notifications
        public int SendFriendRequestNotification(Customer customer, int friendRequestCount, int languageId, int storeId)
        {

            var store = _storeService.GetStoreById(storeId);
            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.FriendRequestNotification", store.Id);
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

        public int SendPendingFriendRequestNotification(Customer customer, int friendRequestCount, int languageId, int storeId)
        {

            var store = _storeService.GetStoreById(storeId);
            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.PendingFriendRequestNotification", store.Id);
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


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.EventInvitationNotification", store.Id);
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

        public int SendProductReviewNotification(Customer customer, List<Product> unreviewedProducts, int languageId, int storeId)
        {

            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);

            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.ProductReviewNotification", store.Id);
            if (messageTemplate == null)
                return 0;

            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>();
            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, customer);


            var productUrls = ProductListToHtmlTable(unreviewedProducts, languageId, storeId);

            tokens.Add(new Token("ProductUrls", productUrls));

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);

            var toEmail = customer.Email;
            var toName = customer.GetFullName().ToTitleCase();
            var emailId = SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);

            return emailId;
        }


        public int SendSomeoneSentYouASongNotification(Customer customer, int languageId, int storeId)
        {


            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.SendSomeoneSentYouASongNotification", store.Id);
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

        public int SendSomeoneChallengedYouForABattleNotification(Customer challenger, Customer challengee, VideoBattle videoBattle,
            int languageId, int storeId)
        {
            return SendSomeoneChallengedYouForABattleNotification(challenger, challenger.Email,
                challenger.GetFullName().ToTitleCase(), videoBattle, languageId, storeId);
        }

        public int SendSomeoneChallengedYouForABattleNotification(Customer challenger, string challengeeEmail, string challengeeName, VideoBattle videoBattle,
            int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.SomeoneChallengedYouForBattleNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("VideoBattle.Title", videoBattle.Name, true),
                new Token("VideoBattle.Url", string.Format("{0}/VideoBattle/{1}", store.Url, videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false)) , true),
                new Token("Challenger.FirstName", challenger.GetFullName() , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, challenger);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = challengeeEmail;
            var toName = challengeeName;

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }

        public int SendVideoBattleCompleteNotification(Customer customer, VideoBattle videoBattle, NotificationRecipientType recipientType, int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate(recipientType == NotificationRecipientType.Participant ? "MobSocial.VideoBattleCompleteNotificationToParticipants" : "MobSocial.VideoBattleCompleteNotificationToVoters", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("VideoBattle.Title", videoBattle.Name, true),
                new Token("VideoBattle.Url", string.Format("{0}/VideoBattles/VideoBattle/{1}", store.Url, videoBattle.Id) , true),

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, customer);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = customer.Email;
            var toName = customer.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }

        public int SendVotingReminderNotification(Customer sender, Customer receiver, VideoBattle videoBattle, int languageId, int storeId)
        {
            return SendVotingReminderNotification(sender, receiver.Email, receiver.GetFullName().ToTitleCase(), videoBattle,
                languageId, storeId);
        }

        public int SendVotingReminderNotification(Customer sender, string receiverEmail, string receiverName, VideoBattle videoBattle, int languageId,
            int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.SomeoneInvitedYouToVoteNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("VideoBattle.Title", videoBattle.Name, true),
                new Token("VideoBattle.Url", string.Format("{0}/VideoBattles/VideoBattle/{1}", store.Url, videoBattle.Id) , true),
                new Token("Inviter.Name", sender.GetFullName() , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, sender);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = receiverEmail;
            var toName = receiverName;

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
            var bodyReplaced = _tokenizer.Replace(body, tokens, false);

            var email = new QueuedEmail()
            {
                Priority = QueuedEmailPriority.High,
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





        /// <summary>
        /// Convert a collection to a HTML table
        /// </summary>
        /// <param name="shipment">Shipment</param>
        /// <param name="languageId">Language identifier</param>
        /// <returns>HTML table of products</returns>
        protected virtual string ProductListToHtmlTable(List<Product> products,  int languageId, int storeId)
        {
            var result = "";

            var sb = new StringBuilder();
            sb.AppendLine("<table border=\"0\" style=\"width:100%;\">");

            #region Products
            sb.AppendLine(string.Format("<tr style=\"background-color:{0};text-align:left;\">", _messageTemplateSettings.Color1));
            sb.AppendLine(string.Format("<th style=\"padding-left: 0.4em;text-align:left;\">{0}</th>", _localizationService.GetResource("Messages.Order.Product(s).Name", languageId)));
            sb.AppendLine("</tr>");

            foreach (var product in products)
            {
                sb.AppendLine(string.Format("<tr style=\"background-color: {0};text-align: center;\">", _messageTemplateSettings.Color2));
                
                //product name
                string productName = product.GetLocalized(x => x.Name, languageId);
                string productUrl = string.Format("{0}{1}", GetStoreUrl(storeId), product.GetSeName(languageId));

                sb.AppendLine("<td style=\"padding: 0.6em 0.4em;text-align: left;\">");
                sb.Append("<a href=\"" + productUrl + "\">" + HttpUtility.HtmlEncode(productName) + "</a>");

                sb.AppendLine("</td>");


                sb.AppendLine("</tr>");
            }
            #endregion

            sb.AppendLine("</table>");
            result = sb.ToString();
            return result;
        }


        /// <summary>
        /// Convert a collection to a HTML table
        /// </summary>
        /// <param name="shipment">Shipment</param>
        /// <param name="languageId">Language identifier</param>
        /// <returns>HTML table of products</returns>
        protected virtual string ProductListToHtmlTable(List<OrderItem> orderItems, int languageId)
        {
            var result = "";

            var sb = new StringBuilder();
            sb.AppendLine("<table border=\"0\" style=\"width:100%;\">");

            #region Products
            sb.AppendLine(string.Format("<tr style=\"background-color:{0};text-align:center;\">", _messageTemplateSettings.Color1));
            sb.AppendLine(string.Format("<th>{0}</th>", _localizationService.GetResource("Messages.Order.Product(s).Name", languageId)));
            sb.AppendLine(string.Format("<th>{0}</th>", _localizationService.GetResource("Messages.Order.Product(s).Quantity", languageId)));
            sb.AppendLine("</tr>");

            var table = orderItems.ToList();
            for (int i = 0; i <= table.Count - 1; i++)
            {
                var orderItem = table[i];
                if (orderItem == null)
                    continue;

                var product = orderItem.Product;
                if (product == null)
                    continue;

                sb.AppendLine(string.Format("<tr style=\"background-color: {0};text-align: center;\">", _messageTemplateSettings.Color2));
                //product name
                string productName = product.GetLocalized(x => x.Name, languageId);

                sb.AppendLine("<td style=\"padding: 0.6em 0.4em;text-align: left;\">" + HttpUtility.HtmlEncode(productName));
                //attributes
                if (!String.IsNullOrEmpty(orderItem.AttributeDescription))
                {
                    sb.AppendLine("<br />");
                    sb.AppendLine(orderItem.AttributeDescription);
                }
                //sku
                if (_catalogSettings.ShowProductSku)
                {
                    var sku = product.FormatSku(orderItem.AttributesXml, _productAttributeParser);
                    if (!String.IsNullOrEmpty(sku))
                    {
                        sb.AppendLine("<br />");
                        sb.AppendLine(string.Format(_localizationService.GetResource("Messages.Order.Product(s).SKU", languageId), HttpUtility.HtmlEncode(sku)));
                    }
                }
                sb.AppendLine("</td>");

                sb.AppendLine(string.Format("<td style=\"padding: 0.6em 0.4em;text-align: center;\">{0}</td>", orderItem.Quantity));

                sb.AppendLine("</tr>");
            }
            #endregion

            sb.AppendLine("</table>");
            result = sb.ToString();
            return result;
        }



        /// <summary>
        /// Get store URL
        /// </summary>
        /// <param name="storeId">Store identifier; Pass 0 to load URL of the current store</param>
        /// <param name="useSsl">Use SSL</param>
        /// <returns></returns>
        private string GetStoreUrl(int storeId = 0, bool useSsl = false)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            if (store == null)
                throw new Exception("No store could be loaded");

            return useSsl ? store.SecureUrl : store.Url;
        }




        #endregion




        public int SendVideoBattleSignupNotification(Customer challenger, Customer challengee, VideoBattle videoBattle, int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.VideoBattleSignupNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("VideoBattle.Title", videoBattle.Name, true),
                new Token("VideoBattle.Url", string.Format("{0}/VideoBattles/VideoBattle/{1}", store.Url, videoBattle.Id) , true),
                new Token("Challenger.Name", challengee.GetFullName() , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, challengee);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = challenger.Email;
            var toName = challenger.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }

        public int SendVideoBattleJoinNotification(Customer challenger, Customer challengee, VideoBattle videoBattle, int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.VideoBattleJoinNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("VideoBattle.Title", videoBattle.Name, true),
                new Token("VideoBattle.Url", string.Format("{0}/VideoBattle/{1}", store.Url, videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false)), true),
                new Token("Challenger.Name", challengee.GetFullName() , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, challengee);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = challenger.Email;
            var toName = challenger.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }


        public int SendVideoBattleSignupAcceptedNotification(Customer challenger, Customer challengee, VideoBattle videoBattle, int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.VideoBattleSignupAcceptedNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("VideoBattle.Title", videoBattle.Name, true),
                new Token("VideoBattle.Url", string.Format("{0}/VideoBattle/{1}", store.Url, videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false)), true),
                new Token("Challenger.Name", challengee.GetFullName() , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, challengee);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = challenger.Email;
            var toName = challenger.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }

        public int SendSponsorAppliedNotificationToBattleOwner(Customer owner, Customer sponsor, VideoBattle videoBattle, int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.SponsorAppliedNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("Battle.Title", videoBattle.Name, true),
                new Token("Battle.Url", string.Format("{0}/VideoBattle/{1}", store.Url, videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false)), true),
                new Token("Sponsor.Name", sponsor.GetFullName() , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, owner);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = owner.Email;
            var toName = owner.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }

        public int SendSponsorshipStatusChangeNotification(Customer receiver, SponsorshipStatus sponsorshipStatus, VideoBattle videoBattle, int languageId,
            int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.SponsorshipStatusChangeNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //tokens
            var tokens = new List<Token>
            {
                new Token("Battle.Title", videoBattle.Name, true),
                new Token("Battle.Url", string.Format("{0}/VideoBattle/{1}", store.Url, videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false)), true),
                new Token("Sponsorship.Status", sponsorshipStatus.ToString() , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, receiver);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = receiver.Email;
            var toName = receiver.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }


        public int SendXDaysToBattleStartNotificationToParticipant(Customer receiver, VideoBattle videoBattle, int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.xDaysToBattleStartNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //find the remaining days to start of battle
            var timeSpan = (int) Math.Ceiling(videoBattle.VotingStartDate.Subtract(DateTime.UtcNow).TotalDays);
            var formattedString = timeSpan > 1 ? string.Format("in {0} days", timeSpan) : "tomorrow";
            //tokens
            var tokens = new List<Token>
            {
                new Token("Battle.Title", videoBattle.Name, true),
                new Token("Battle.Url", string.Format("{0}/VideoBattle/{1}", store.Url, videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false)), true),
                new Token("Battle.StartDaysString", formattedString , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, receiver);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = receiver.Email;
            var toName = receiver.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }

        public int SendXDaysToBattleEndNotificationToFollower(Customer receiver, VideoBattle videoBattle, int languageId, int storeId)
        {
            var store = _storeService.GetStoreById(storeId) ?? _storeContext.CurrentStore;

            languageId = EnsureLanguageIsActive(languageId, store.Id);


            var messageTemplate = GetLocalizedActiveMessageTemplate("MobSocial.xDaysToBattleStartNotification", store.Id);
            if (messageTemplate == null)
                return 0;


            var emailAccount = GetEmailAccountOfMessageTemplate(messageTemplate, languageId);

            //find the remaining days to end of battle
            var timeSpan = (int)Math.Ceiling(videoBattle.VotingEndDate.Subtract(DateTime.UtcNow).TotalDays);
            var formattedString = timeSpan > 1 ? string.Format("in {0} days", timeSpan) : "tomorrow";
            //tokens
            var tokens = new List<Token>
            {
                new Token("Battle.Title", videoBattle.Name, true),
                new Token("Battle.Url", string.Format("{0}/VideoBattle/{1}", store.Url, videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false)), true),
                new Token("Battle.EndDaysString", formattedString , true)

            };

            _messageTokenProvider.AddStoreTokens(tokens, store, emailAccount);
            _messageTokenProvider.AddCustomerTokens(tokens, receiver);

            //event notification
            _eventPublisher.MessageTokensAdded(messageTemplate, tokens);


            var toEmail = receiver.Email;
            var toName = receiver.GetFullName().ToTitleCase();

            return SendNotification(messageTemplate, emailAccount, languageId, tokens, toEmail, toName);
        }
    }
}

    


