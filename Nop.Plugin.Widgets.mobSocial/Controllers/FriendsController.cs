
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Mob.Core;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Plugin.Widgets.MobSocial.Extensions;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Media;
using Nop.Services.Security;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class FriendsController : BasePublicController
    {
        private readonly IFriendService _friendService;
        private readonly IPermissionService _permissionService;
        private readonly IWorkContext _workContext;
        private readonly IPictureService _pictureService;
        private readonly ICustomerService _customerService;

        public FriendsController(IFriendService friendService, IPermissionService permissionService, IWorkContext workContext, IPictureService pictureService, ICustomerService customerService)
        {
            _friendService = friendService;
            _permissionService = permissionService;
            _workContext = workContext;
            _pictureService = pictureService;
            _customerService = customerService;
        }

        [ChildActionOnly]
        public ActionResult AddFriendButton(int toCustomerId)
        {

            var model = new AddFriendButtonModel
            {
                CustomerProfileId = toCustomerId,
                CurrentCustomerId = _workContext.CurrentCustomer.Id
            };

            //retrieve customer friend object
            var customerFriend = _friendService.GetCustomerFriendship(_workContext.CurrentCustomer.Id, toCustomerId);
            FriendStatus friendStatus = FriendStatus.None;

            if(customerFriend == null)
                friendStatus = FriendStatus.None;
            else if (customerFriend.Confirmed)
                friendStatus = FriendStatus.Friends;
            else if (!customerFriend.Confirmed && customerFriend.FromCustomerId == _workContext.CurrentCustomer.Id)
                friendStatus = FriendStatus.FriendRequestSent;
            else
                friendStatus = FriendStatus.NeedsConfirmed;



            model.ShowAddFriendButton = friendStatus == FriendStatus.None;
            model.ShowFriendsButton = friendStatus == FriendStatus.Friends;
            model.ShowConfirmFriendButton = friendStatus == FriendStatus.NeedsConfirmed;
            model.ShowFriendRequestSent = friendStatus == FriendStatus.FriendRequestSent;

            return View("mobSocial/Friends/_AddFriendButton", model);

        } 

        [Authorize]
        public ActionResult AddFriend(int ToCustomerId)
        {

            if (_workContext.CurrentCustomer.Id == ToCustomerId)
                return Json(new { Success = false, Message = "Can't add one's self" });

            var fromCustomerId = _workContext.CurrentCustomer.Id;

            //first check if the request has already been sent?
            var customerFriend = _friendService.GetCustomerFriendship(fromCustomerId, ToCustomerId) ??
                                 new CustomerFriend() {
                                     FromCustomerId = fromCustomerId,
                                     ToCustomerId = ToCustomerId,
                                     DateCreated = DateTime.UtcNow,
                                     DateRequested = DateTime.UtcNow
                                 };

            if (customerFriend.Confirmed)
            {
                return Json(new { Success = false, Message = "Already friends" });
            }

            if (customerFriend.Id == 0)
                _friendService.Insert(customerFriend);


            return Json(new { Success = true });

        }

        [Authorize]
        public ActionResult ConfirmFriend(int FriendCustomerId)
        {

            if (_workContext.CurrentCustomer.Id == FriendCustomerId)
                return Json(new { Success = false, Message = "Can't add one's self" });

            var ToCustomerId = _workContext.CurrentCustomer.Id;

            //first check if the request has already been sent?. Only the receiver can accept or decline
            var customerFriend = _friendService.GetCustomerFriend(FriendCustomerId, ToCustomerId);

            if (customerFriend == null)
                return Json(new { Success = false, Message = "No friendship request sent" });

            customerFriend.Confirmed = true;
            customerFriend.DateConfirmed = DateTime.UtcNow;
            _friendService.Update(customerFriend);

            return Json(new { Success = true });
        }

        [Authorize]
        public ActionResult DeclineFriend(int Customer1Id)
        {

            if (_workContext.CurrentCustomer.Id == Customer1Id)
                return Json(new { Success = false, Message = "Can't add one's self" });

            var Customer2Id = _workContext.CurrentCustomer.Id;

            //first check if the request has already been sent?. Any of two parties can decline
            var customerFriend = _friendService.GetCustomerFriendship(Customer1Id, Customer2Id);

            if (customerFriend == null)
                return Json(new { Success = false, Message = "No friendship request sent" });

           _friendService.Delete(customerFriend);

            return Json(new { Success = true });
        }

        [Authorize]
        public ActionResult FriendRequests()
        {

            var friendRequests = _friendService.GetCustomerFriendRequests(_workContext.CurrentCustomer.Id);

            var model = new FriendRequestsModel {NavigationModel = SessionState.Instance.CustomerNavigationModel};


            foreach (var request in friendRequests)
            {

                var friendId = request.FromCustomerId;
                var friendCustomer = _customerService.GetCustomerById(friendId);
                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        75);

                model.FriendRequests.Add(new FriendRequestModel() {
                    FriendId = friendId,
                    CustomerDisplayName = friendCustomer.GetFullName(),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = friendCustomer.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                    ProfileThumbnailUrl = friendThumbnailUrl
                });

            }

            return View("mobSocial/Friends/FriendRequests", model);
        }

        [Authorize]
        public ActionResult CustomerFriends(int customerId = 0, int howMany = 0, bool random = false)
        {

            if (customerId == 0)
                customerId = _workContext.CurrentCustomer.Id;

            var friends = _friendService.GetCustomerFriends(customerId);

            var model = new List<CustomerFriendsModel>();

            foreach (var friend in friends)
            {

                var friendId = (friend.FromCustomerId == customerId) ? friend.ToCustomerId : friend.FromCustomerId;

                var friendCustomer = _customerService.GetCustomerById(friendId);

                if (friendCustomer == null)
                    continue;

                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        100,
                        true);

                model.Add(new CustomerFriendsModel() {
                    CustomerDisplayName = friendCustomer.GetFullName().ToTitleCase(),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = friendCustomer.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                    ProfileThumbnailUrl = friendThumbnailUrl
                });

            }



            return View("mobSocial/Friends/_CustomerFriends", model);

        }

    }
}