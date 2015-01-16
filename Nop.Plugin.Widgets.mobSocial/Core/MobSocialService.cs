using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core;
using Nop.Core.Caching;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using Nop.Services.Catalog;
using Nop.Services.Customers;
using Nop.Services.Messages;
using System.Data.Entity.Core.Objects;
using System.Data.Entity;
using Nop.Services.Orders;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Shipping;
using System.Text;
using Nop.Services.Localization;
using Nop.Core.Domain.Messages;
using System.Web;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Product service
    /// </summary>
    public class MobSocialService : IMobSocialService
    {

        #region Fields

        /// <summary>
        /// Object context
        /// </summary>
        private readonly IRepository<GroupPage> _groupPageRepository;
        private readonly IRepository<GroupPageMember> _groupPageMemberRepository;
        private readonly IRepository<CustomerFriend> _customerFriendRepository;
        private readonly IRepository<TeamPage> _teamPageRepository;
        private readonly IRepository<CustomerAlbum> _customerAlbumRepository;
        private readonly IStoreContext _storeContext;



        private ICacheManager _cacheManager;
        private readonly IWorkContext _workContext;
        private readonly IWorkflowMessageService _workflowMessageService;
        private readonly ICustomerService _customerService;
        private readonly IMobSocialMessageService _mobSocialMessageService;
        private IProductService _productService;
        private IOrderService _orderService;
        private ILocalizationService _localizationService;
        private MessageTemplatesSettings _messageTemplateSettings;
        private CatalogSettings _catalogSettings;
        private IProductAttributeParser _productAttributeParser;
        private INotificationService _notificationService;

        #endregion

        #region Properties

        /// <summary>
        /// Gets a value indicating whether cache is enabled
        /// </summary>
        public bool CacheEnabled
        {
            

            get
            {
                //ISettingService ser;
                //var setting = ser.GetSettingByKey("Cache.ProductManager.CacheEnabled").Value;

                // IoC.Resolve<ISettingService>().GetSettingValueBoolean("");
                return true;
            }
        }

        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="context">Object context</param>
        public MobSocialService(IProductService productService, IRepository<GroupPage> groupPageRepository, 
            IRepository<GroupPageMember> groupPageMemberRepository, IRepository<CustomerFriend> customerFriendRepository,
            IRepository<TeamPage> teamPageRepository, IRepository<CustomerAlbum> customerAlbumRepository, ICacheManager cacheManager, IWorkContext workContext,
            IWorkflowMessageService workflowMessageService, ICustomerService customerService,
            IOrderService orderService, ILocalizationService localizationService, MessageTemplatesSettings messageTemplateSettings,
            INotificationService notificationService, CatalogSettings catalogSettings, IProductAttributeParser productAttributeParser,
            IMobSocialMessageService mobSocialMessageService, IStoreContext storeContext)
        {

            this._groupPageRepository = groupPageRepository;
            _groupPageMemberRepository = groupPageMemberRepository;
            _customerFriendRepository = customerFriendRepository;
            _teamPageRepository = teamPageRepository;
            _customerAlbumRepository = customerAlbumRepository;


            _cacheManager = cacheManager;
            _workContext = workContext;
            _workflowMessageService = workflowMessageService;
            _customerService = customerService;
            _mobSocialMessageService = mobSocialMessageService;
            _productService = productService;
            _storeContext = storeContext;
            _orderService = orderService;
            _localizationService = localizationService;
            _messageTemplateSettings = messageTemplateSettings;
            _catalogSettings = catalogSettings;
            _productAttributeParser = productAttributeParser;
            _notificationService = notificationService;
        }

        #endregion


        #region Methods

        public void SendFriendRequest(int fromCustomerId, int toCustomerId)
        {
            _customerFriendRepository.Insert(new CustomerFriend()
                {
                    DateRequested   = DateTime.Now,
                    Confirmed = false,
                    FromCustomerId = fromCustomerId,
                    ToCustomerId = toCustomerId,
                });

        }

        public void ConfirmFriendRequest(int customerFriendId)
        {
            var customerId = _workContext.CurrentCustomer.Id;
            var friend = _customerFriendRepository.Table.FirstOrDefault(x=>x.FromCustomerId == customerFriendId
                    && x.ToCustomerId == customerId);

            friend.Confirmed = true;
            friend.DateConfirmed = DateTime.Now;

            _customerFriendRepository.Update(friend);
        }


        public List<CustomerFriend> GetRandomFriends(int customerId, int howMany)
        {


            

            var randomFriends = _customerFriendRepository.Table
                                    .Where(x=>x.FromCustomerId == customerId || x.ToCustomerId == customerId)
                                    .Where(x=>x.Confirmed)
                                    .OrderBy(x => Guid.NewGuid())
                                    .Take(howMany)
                                    .ToList();

            return randomFriends;

        }

        public TeamPage GetTeam(int teamId)
        {
            return _teamPageRepository.GetById(teamId);
        }


       


        public void InsertTeamPage(TeamPage teamPage)
        {
            _teamPageRepository.Insert(teamPage);
            
            

        }

        public void InsertGroupPage(GroupPage groupPage)
        {
            _groupPageRepository.Insert(groupPage);
        }

        public FriendStatus GetFriendRequestStatus(int currentCustomerId, int friendCustomerId)
        {


            int me = currentCustomerId; // for easier understanding
            int friend = friendCustomerId;

            var customerFriend = _customerFriendRepository.Table
                                        .FirstOrDefault(x => (x.FromCustomerId == me && x.ToCustomerId == friend) ||
                                                             (x.FromCustomerId == friend && x.ToCustomerId == me));

            
            if (customerFriend == null)
                return FriendStatus.None;

            if (customerFriend.Confirmed)
                return FriendStatus.Friends;

            if (!customerFriend.Confirmed && customerFriend.FromCustomerId == me && customerFriend.ToCustomerId == friend)
                return FriendStatus.FriendRequestSent;

            if (!customerFriend.Confirmed && customerFriend.FromCustomerId == friend && customerFriend.ToCustomerId == me)
                return FriendStatus.NeedsConfirmed;

            return FriendStatus.None;

        }

        public List<CustomerFriend> GetFriends(int customerId)
        {

            var friends = _customerFriendRepository.Table
                                    .Where(x => x.FromCustomerId == customerId || x.ToCustomerId == customerId)
                                    .Where(x => x.Confirmed)
                                    .OrderBy(x => Guid.NewGuid())
                                    .ToList();

            return friends;
        }

        public List<CustomerFriend> GetFriends(int customerId, int index, int count)
        {

            var friends = _customerFriendRepository.Table
                                    .Where(x => (x.FromCustomerId == customerId || x.ToCustomerId == customerId) && 
                                                 x.Confirmed)
                                    .OrderBy(x => x.DateConfirmed)
                                    .Skip(index).Take(count)
                                    .ToList();

            return friends;
        }

        public int GetFriendRequestCount(int currentCustomerId)
        {
            var me = currentCustomerId;
            return _customerFriendRepository.Table.Count(x => x.ToCustomerId == me && !x.Confirmed);
        }

        //TODO: Make a NotificationService to centralize and encapsulate notification methods/logic
        public void SendFriendRequestNotifications()
        {
            // get friend requests that haven't had a notification sent
            var friendRequests = _customerFriendRepository.Table
                                    .Where(x => x.Confirmed == false && x.NotificationCount == 0)
                                    .GroupBy(x=>x.ToCustomerId)
                                    .Select(g => new { CustomerId = g.Key, FriendRequestCount = g.Count() })
                                    .ToList();

            foreach (var friendRequest in friendRequests)
            {
                var customer = _customerService.GetCustomerById(friendRequest.CustomerId);

                if (customer == null)
                    continue;

                _mobSocialMessageService.SendFriendRequestNotification(customer, friendRequest.FriendRequestCount, 
                    _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);
                UpdateFriendRequestNotificationCounts(friendRequest.CustomerId);
            }


            // Send a reminder a week later. Get friend requests that have had one notification since last week
            var weekUnconfirmedFriendRequests = _customerFriendRepository.Table
                                                    .Where(x => x.Confirmed == false && x.NotificationCount == 1)
                                                    .Where(x => DbFunctions.AddDays(x.LastNotificationDate, 7) < DateTime.Now)
                                                    .GroupBy(x => x.ToCustomerId)
                                                    .Select(g => new { CustomerId = g.Key, FriendRequestCount = g.Count() })
                                                    .ToList();


            foreach (var weekUnconfirmedFriendRequest in weekUnconfirmedFriendRequests)
            {
                var customer = _customerService.GetCustomerById(weekUnconfirmedFriendRequest.CustomerId);
                _mobSocialMessageService.SendPendingFriendRequestNotification(customer,
                    weekUnconfirmedFriendRequest.FriendRequestCount, _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);
                UpdateFriendRequestNotificationCounts(weekUnconfirmedFriendRequest.CustomerId);
            }


            // Send pending friend request reminder each month
            var monthlyUnconfirmedFriendRequests = _customerFriendRepository.Table
                    .Where(x => x.Confirmed == false && x.NotificationCount > 1)
                    .Where(x => DbFunctions.AddMonths(x.LastNotificationDate, 1) < DateTime.Now)
                    .GroupBy(x => x.ToCustomerId)
                    .Select(g => new { CustomerId = g.Key, FriendRequestCount = g.Count() })
                    .ToList();


            foreach (var monthlyUnconfirmedFriendRequest in monthlyUnconfirmedFriendRequests)
            {
                var customer = _customerService.GetCustomerById(monthlyUnconfirmedFriendRequest.CustomerId);
                _mobSocialMessageService.SendPendingFriendRequestNotification(customer,
                    monthlyUnconfirmedFriendRequest.FriendRequestCount, _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);
                UpdateFriendRequestNotificationCounts(monthlyUnconfirmedFriendRequest.CustomerId);
            }

        }


        //TODO: Too many moving parts for tasks and notifications move all the logic into the messageService and use of helper methods is fine
        public void SendProductReviewNotifications()
        {

            // Last five years of delivered orders
            var orders = _orderService.SearchOrders(0, 0, 0, 0, 0, 0, DateTime.Now.AddYears(-5), null, OrderStatus.Complete, null, ShippingStatus.Delivered, null, null, 0);

            var fiveDaysAgo = DateTime.Now.AddDays(-5);

            // Ensure the customer has had enough time to use the product (five days after delivery; most people are eager to try new products)
            var usedOrders = orders.Where(x => x.Shipments.Any(y => y.DeliveryDateUtc <= fiveDaysAgo));

            var customerOrders = usedOrders
                .GroupBy(o => o.CustomerId)
                .Select((ordrs, customerId) => new { Customer = ordrs.First().Customer, Orders = ordrs.ToList() })
                .ToList();

            foreach(var customerAndOrders in customerOrders)
            {
                var customer = customerAndOrders.Customer;
                var customerDistinctProducts = customerAndOrders.Orders.SelectMany(o => o.OrderItems.Select(oi => oi.Product).Distinct());
                var customerDistinctProductIds = customerDistinctProducts.Select(p => p.Id).ToList();


                // send notification semi-annually (6 months) if customer has not written a review
                var notificationFromDate = DateTime.Now.AddMonths(-6);
                var productReviewNotifications = _notificationService.GetProductReviewNotifications(customer.Id, customerDistinctProductIds, notificationFromDate);

                var productReviewNotificationsProductIds = productReviewNotifications.Select(prv => prv.ProductId);

                var unsentProductIds = customerDistinctProductIds.Except(productReviewNotificationsProductIds);

                if (unsentProductIds.Count() == 0)
                    continue;

                // Send one notificaiton for all products that have not had a review written by the customer; sending one notification per product would frustrate customers.
                var unreviewedProducts = _productService.GetProductsByIds(unsentProductIds.ToArray()).ToList();

                _mobSocialMessageService.SendProductReviewNotification(customer, unreviewedProducts, _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);

                _notificationService.UpdateProductReviewNotifications(customer, unreviewedProducts);

            }

        
        }

        

        public List<CustomerFriend> GetFriendRequests(int currentCustomerId)
        {

            var me = currentCustomerId;
            return _customerFriendRepository.Table
                .Where(x => (x.ToCustomerId == me) && !x.Confirmed).ToList();
               
        }
        
        #endregion


        #region Helper Methods
        private void UpdateFriendRequestNotificationCounts(int customerId)
        {
            var customerFriendRequests = _customerFriendRepository.Table
                .Where(x => x.Confirmed == false && x.ToCustomerId == customerId)
                .ToList();

            customerFriendRequests.ForEach(x =>
            {
                x.NotificationCount++;
                x.LastNotificationDate = DateTime.Now;
                _customerFriendRepository.Update(x);
            });

        }


      

        private void SendProductReviewNotification(Customer customer, List<Product> products)
        {

        }


        #endregion

    }
}

    

