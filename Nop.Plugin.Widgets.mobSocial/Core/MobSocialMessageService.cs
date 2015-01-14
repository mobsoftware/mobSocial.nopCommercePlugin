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
using Nop.Core.Domain.Orders;
using Nop.Services.Orders;
using Nop.Core.Domain.Shipping;
using System.Text;
using System.Web;

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
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private ILocalizationService _localizationService;
        private MessageTemplatesSettings _messageTemplateSettings;
        private CatalogSettings _catalogSettings;
        private IProductAttributeParser _productAttributeParser;

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
                                           IOrderService orderService, IProductService productService,
                                           IEmailAccountService emailAccountService,
                                           INotificationService notificationService,
                                           EmailAccountSettings emailAccountSettings,
                                           ILocalizationService localizationService, 
                                           MessageTemplatesSettings messageTemplateSettings,
                                           CatalogSettings catalogSettings, 
                                           IProductAttributeParser productAttributeParser
            )
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
            _productService = productService;
            _orderService = orderService;
            _queuedEmailService = queuedEmailService;
            _emailAccountService = emailAccountService;
            _emailAccountSettings = emailAccountSettings;
            _localizationService = localizationService;
            _messageTemplateSettings = messageTemplateSettings;
            _catalogSettings = catalogSettings;
            _productAttributeParser = productAttributeParser;
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
            sb.AppendLine(string.Format("<th style=\"padding-left: 0.4em;\">{0}</th>", _localizationService.GetResource("Messages.Order.Product(s).Name", languageId)));
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


    }
}

    


