using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Admin.Controllers;
using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Forums;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Seo;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Models.TeamPage;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Orders;
using Nop.Services.Security;
using Nop.Services.Seo;
using Nop.Web.Framework;
using Nop.Web.Framework.Security;
using Nop.Web.Models.Customer;
using Mob.Core;


namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class mobSocialController : Nop.Web.Controllers.BaseNopController
    {

        private IPermissionService _permissionService;
        private readonly IWorkContext _workContext;
        private AdminAreaSettings _adminAreaSettings;
        private ILocalizationService _localizationService;
        private readonly IPictureService _pictureService;
        private readonly mobSocialSettings _socialNetworkSettings;
        private readonly MediaSettings _mediaSettings;
        private readonly CustomerSettings _customerSettings;
        private readonly OrderService _orderService;
        private readonly ForumSettings _forumSettings;
        private readonly RewardPointsSettings _rewardPointsSettings;
        private readonly OrderSettings _orderSettings;
        private readonly IStoreContext _storeContext;
        private readonly IMobSocialService _socialNetworkService;
        private readonly ICustomerService _customerService;
        private IWebHelper _webHelper;
        private readonly IUrlRecordService _urlRecordService;
        private readonly IRepository<UrlRecord> _urlRecordRepository;

        public mobSocialController(IPermissionService permissionService,
            IWorkContext workContext, AdminAreaSettings adminAreaSettings, ILocalizationService localizationService,
            IPictureService pictureService, IMobSocialService socialNetworkService, ICustomerService customerService,
            mobSocialSettings socialNetworkSettings, MediaSettings mediaSettings, CustomerSettings customerSettings, 
            ForumSettings forumSettings, RewardPointsSettings rewardPointsSettings, OrderSettings orderSettings,
             IStoreContext storeContext, IWebHelper webHelper, IUrlRecordService urlRecordService, IRepository<UrlRecord> urlRecordRepository)
        {
            _permissionService = permissionService;
            _workContext = workContext;
            _adminAreaSettings = adminAreaSettings;
            _localizationService = localizationService;
            _pictureService = pictureService;
            _socialNetworkService = socialNetworkService;
            _customerService = customerService;
            _socialNetworkSettings = socialNetworkSettings;
            _mediaSettings = mediaSettings;
            _customerSettings = customerSettings;
            _forumSettings = forumSettings;
            _rewardPointsSettings = rewardPointsSettings;
            _orderSettings = orderSettings;
            _storeContext = storeContext;
            _webHelper = webHelper;
            _urlRecordService = urlRecordService;
            _urlRecordRepository = urlRecordRepository;
        }


        public ActionResult ProfileInformation()
        {


            var model = new ProfileInformationModel();

            model.NavigationModel = SessionState.Instance.CustomerNavigationModel;

            return View("ProfileInformation", model);

        }

        [ChildActionOnly]
        public ActionResult SocialNetworkByMobSocial(string widgetZone)
        {
            return Content("social network by mobSocial");
        }

        

        
        public ActionResult Configure()
        {

            var model = new ConfigurationModel
                {
                    ZoneId = _socialNetworkSettings.WidgetZone
                };

            model.AvailableZones.Add(new SelectListItem() { Text = "Before left side column", Value = "left_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After left side column", Value = "left_side_column_after" });
            model.AvailableZones.Add(new SelectListItem() { Text = "Before right side column", Value = "right_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After right side column", Value = "right_side_column_after" });
           
            return View("Nop.Plugin.Widgets.mobSocial.Views.mobSocial.Configure", model);

        }


        //todo: prevent automated calls by limiting action to specific buttons and or other criteria
        public ActionResult AddFriend(int toCustomerId)
        {

            if (_workContext.CurrentCustomer.IsGuest())
                return Json(new {redirect = Url.RouteUrl("Login")}, JsonRequestBehavior.AllowGet);
            
            try
            {
                int fromCustomerId = _workContext.CurrentCustomer.Id;

                _socialNetworkService.SendFriendRequest(fromCustomerId, toCustomerId);
                return Json(new { success = true, message = "Friend Request Sent!" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = true, message = "Could not add friend. Please try again. If the problem persists, please contact us." }, JsonRequestBehavior.AllowGet);
            }


        }
        
        public ActionResult ConfirmFriend(int friendCustomerId)
        {
            try
            {
                _socialNetworkService.ConfirmFriendRequest(friendCustomerId);
                return Json(new { success = true, message = "Friend Confirmed!" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false, message = "Could not add friend. Please try again. If the problem persists, please contact us." });
            }
            
        }


        
        public ActionResult SearchTermAutoComplete(string term)
        {
            if (String.IsNullOrWhiteSpace(term) || term.Length < _socialNetworkSettings.PeopleSearchTermMinimumLength)
                return Json(new object());

            _socialNetworkSettings.PeopleSearchAutoCompleteNumberOfPeople = 10;

            var customers = _customerService.GetAllCustomers(null, null, 0, 0, null, null, null, term, null, 0, 0,
                                                            null, null, null, false, null, 0, _socialNetworkSettings.PeopleSearchAutoCompleteNumberOfPeople);
            
            
            var models = new List<object>();

            foreach (var c in customers)
            {

                models.Add(new
                    {
                        DisplayName = c.GetFullName(),
                        PictureUrl = _pictureService.GetPictureUrl(
                            c.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId), 50),

                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = c.GetSeName(0) }),

                    });


            }

            return Json(models, JsonRequestBehavior.AllowGet);

        }



        public ActionResult PopulateUrlSlugs()
        {


            var customers = _customerService.GetAllCustomers();

            foreach (var customer in customers)
            {
                if(customer.IsGuest())
                    continue;

                string firstName = customer.GetAttribute<string>(SystemCustomerAttributeNames.FirstName);
                string lastName = customer.GetAttribute<string>(SystemCustomerAttributeNames.LastName);

                if (firstName == null || lastName == null)
                    continue;


                // todo: pull line below out into a service method
                 bool customerAlreadyHasCustomUrl = _urlRecordRepository.Table
                                    .Any(urlRecord => urlRecord.EntityId == customer.Id && 
                                                    urlRecord.EntityName == "Customer");

                if (!customerAlreadyHasCustomUrl)
                {

                   
                    var customersWithSameName = _customerService.GetAllCustomers(default(DateTime?), default(DateTime?),
                            0, 0, null, null, null, firstName, lastName);

                    int numberSameNameWithSlugs = customersWithSameName.Count(c => _urlRecordRepository.Table
                                     .Any(urlRecord => urlRecord.EntityId == c.Id && urlRecord.EntityName == "Customer"));


                    string slug = firstName.Trim() + "-" + lastName.Trim() + 
                       ( (numberSameNameWithSlugs > 0)
                                      ? "-" + (numberSameNameWithSlugs + 1).ToString()
                                      : string.Empty );

                    
                   _urlRecordService.InsertUrlRecord(new UrlRecord() {
                       EntityId = customer.Id,
                       EntityName = "Customer",
                       LanguageId = 0,
                       Slug = slug.ToLowerInvariant(),
                       IsActive = true
                   });
                   
                }
            }


            return Content("Done");


        }



        

        


        // todo add security to pertinent actions
        public ActionResult CustomerFriendBlock(int customerId, int howMany)
        {

            if(customerId == -1)
                customerId = _workContext.CurrentCustomer.Id;

             var friends = _socialNetworkService.GetRandomFriends(customerId, howMany);

            var model = new List<CustomerFriendModel>();

            foreach (var friend in friends)
            {

                var friendId = (friend.FromCustomerId == customerId) ? friend.ToCustomerId : friend.FromCustomerId;



                var friendCustomer = _customerService.GetCustomerById(friendId);

                if(friendCustomer == null)
                    continue;

                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        50,
                        true);

                model.Add(new CustomerFriendModel()
                    {
                        CustomerDisplayName = friendCustomer.GetFullName().ToTitleCase(),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = friendCustomer.GetSeName(0) }),
                        ProfileThumbnailUrl = friendThumbnailUrl
                    });

            }



            return View("_CustomerFriendBlock", model);

        }


        // todo add security to pertinent actions
        public ActionResult SocialNetworkNavigation(CustomerNavigationModel navigationModel)
        {

            var currentCustomerId = _workContext.CurrentCustomer.Id;

            int friendRequestCount = _socialNetworkService.GetFriendRequestCount(currentCustomerId);

            var model = new SocialNetworkNavigationModel();

            SessionState.Instance.CustomerNavigationModel = navigationModel;

            model.NavigationModel = navigationModel;

            StatefulStorage.PerSession.GetOrAdd("CustomerNavigationModel", () => navigationModel);

            if (friendRequestCount == 0)
                model.FriendRequestsLinkText = "Friend Requests";
            else
                model.FriendRequestsLinkText = "Friend Requests(" + friendRequestCount + ")";


            model.ProfileInformationLinkText = "Profile Info";


            return View("_SocialNetworkNavigation", model);
            
        }



        public ActionResult FriendRequests()
        {

            
            var friendRequests = _socialNetworkService.GetFriendRequests(_workContext.CurrentCustomer.Id);

            var model = new FriendRequestsModel();

            model.NavigationModel = SessionState.Instance.CustomerNavigationModel;
            
            foreach (var request in friendRequests)
            {

                var friendId = request.FromCustomerId;
                var friendCustomer = _customerService.GetCustomerById(friendId);
                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        75);

                model.FriendRequests.Add(new FriendRequestModel()
                    {
                        FriendId = friendId,
                        CustomerDisplayName = friendCustomer.GetFullName(),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = friendCustomer.GetSeName(0) }),
                        ProfileThumbnailUrl = friendThumbnailUrl
                    });

            }


         
            return View("FriendRequests", model);

        }



        // todo add security to pertinent actions
        public ActionResult CustomerFriends(int customerId)
        {

            if (customerId == -1)
                customerId = _workContext.CurrentCustomer.Id;

            var friends = _socialNetworkService.GetFriends(customerId);
            
            var model = new List<CustomerFriendsModel>();

            foreach (var friend in friends)
            {
                
                var friendId = (friend.FromCustomerId == customerId) ? friend.ToCustomerId : friend.FromCustomerId;

                var friendCustomer = _customerService.GetCustomerById(friendId);

                if (friendCustomer == null) continue;

                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        100,
                        true);

                model.Add(new CustomerFriendsModel()
                {
                    CustomerDisplayName = friendCustomer.GetFullName().ToTitleCase(),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = friendCustomer.GetSeName(0) }),
                    ProfileThumbnailUrl = friendThumbnailUrl
                });

            }



            return View("_CustomerFriends", model);

        }

        // todo add security to pertinent actions
        //todo consolidate left profile actions into one view and action for performance
        public ActionResult AddFriendButton(int toCustomerId)
        {

            var model = new AddFriendButtonModel();
            model.CustomerProfileId = toCustomerId;
            model.CurrentCustomerId = _workContext.CurrentCustomer.Id;

            FriendStatus friendStatus = _socialNetworkService.GetFriendRequestStatus(_workContext.CurrentCustomer.Id, toCustomerId);

            model.ShowAddFriendButton = friendStatus == FriendStatus.None;
            model.ShowFriendsButton = friendStatus == FriendStatus.Friends;
            model.ShowConfirmFriendButton = friendStatus == FriendStatus.NeedsConfirmed;
            model.ShowFriendRequestSent = friendStatus == FriendStatus.FriendRequestSent;
            
            return View("_AddFriendButton", model);

        } 



        // todo add security to pertinent actions
        public ActionResult Team(int teamId)
        {

            var team = _socialNetworkService.GetTeam(teamId);

            if (teamId == 1 && team == null)
            {
                CreateSampleData();
                team = _socialNetworkService.GetTeam(teamId);
            }



            var model = new TeamPageModel()
                {

                    TeamName = team.Name,
                    TeamDescription = team.Description,
                    TeamPictureUrl = team.TeamPictureUrl
                };

            // team groups
            foreach (var group in team.GroupPages)
            {

                var groupModel = new TeamPageGroupModel()
                    {
                        Name = group.Name,
                        Description = group.Description,

                    };

                // team group members 
                foreach (var member in group.Members)
                {

                    var memberCustomer = _customerService.GetCustomerById(member.CustomerId);
                    var memberThumbnailUrl = _pictureService.GetPictureUrl(
                        memberCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        150,
                        true);

                    
                    groupModel.Members.Add(new TeamPageGroupMemberModel()
                        {
                            DisplayName = memberCustomer.GetFullName(),
                            ProfileUrl =  Url.RouteUrl("CustomerProfileUrl", new { SeName = memberCustomer.GetSeName(0) }),
                            ThumbnailUrl = memberThumbnailUrl
                        });
                }

                model.Groups.Add(groupModel);



            }

            return View("TeamPage", model);

        }

       


        public ActionResult ProfilePicture(int customerId)
        {
            bool avatarEnabled = false;
            string avatarUrl = _pictureService.GetDefaultPictureUrl(_mediaSettings.AvatarPictureSize, PictureType.Avatar);

            if (_customerSettings.AllowCustomersToUploadAvatars)
            {
                avatarEnabled = true;
                var customer = _customerService.GetCustomerById(customerId);
                var customerAvatarId = customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId);

                if (customerAvatarId != 0)
                    avatarUrl = _pictureService.GetPictureUrl(customerAvatarId, _mediaSettings.AvatarPictureSize);
                else
                {
                    if (!_customerSettings.DefaultAvatarEnabled)
                        avatarEnabled = false;
                }
            }


            var model = new ProfilePictureModel()
                {
                    AvatarEnabled = avatarEnabled,
                    AvatarUrl = avatarUrl,

                };


            return View("_ProfilePicture", model);



        }

        

        private void CreateSampleData()
        {
            var teamPage = new TeamPage()
            {
                CreatedBy = 1,
                CreatedOn = DateTime.Now,
                UpdatedBy = 1,
                UpdatedOn = DateTime.Now,
                Name = "SkateMob",
                Description = "SkateMob members are the #1 skaters in the world!",
                TeamPictureUrl = ""

            };


            _socialNetworkService.InsertTeamPage(teamPage);


            var groupPage = new GroupPage()
            {
                Name = "Soldiers",
                Description = "New and upcoming skaters",
                PayPalDonateUrl = ""

            };

            _socialNetworkService.InsertGroupPage(groupPage);


        }

      
     


    }





}
