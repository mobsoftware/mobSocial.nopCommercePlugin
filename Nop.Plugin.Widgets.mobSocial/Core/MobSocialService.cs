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

                

                _mobSocialMessageService.SendFriendRequestNotification(customer, 
                    friendRequest.FriendRequestCount, _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);


                UpdateFriendRequestNotificationCounts(friendRequest.CustomerId);


            }


            // Send a reminder a week later. Get friend requests that have had one notification sent last week
            var weekUnconfirmedFriendRequests = _customerFriendRepository.Table
                                                          .Where(x => x.Confirmed == false && x.NotificationCount == 1 && x.LastNotificationDate > DateTime.Now.AddDays(-7))
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


            // Send pending friend request reminder monthly
            var monthlyUnconfirmedFriendRequests = _customerFriendRepository.Table
                                                          .Where(x => x.Confirmed == false && x.NotificationCount > 1 && x.LastNotificationDate > DateTime.Now.AddMonths(-x.NotificationCount-1))
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

        private void UpdateFriendRequestNotificationCounts(int customerId)
        {
            var customerFriendRequests = _customerFriendRepository.Table.Where(x => x.Confirmed == false && x.ToCustomerId == customerId).ToList();

            customerFriendRequests.ForEach(x => {
                x.NotificationCount++;
                x.LastNotificationDate = DateTime.Now;
                _customerFriendRepository.Update(x);
            });

        }

        public List<CustomerFriend> GetFriendRequests(int currentCustomerId)
        {

            var me = currentCustomerId;
            return _customerFriendRepository.Table
                                    .Where(x => (x.ToCustomerId == me) && !x.Confirmed).ToList();
               
        }
        
        #endregion

    }
}

    

