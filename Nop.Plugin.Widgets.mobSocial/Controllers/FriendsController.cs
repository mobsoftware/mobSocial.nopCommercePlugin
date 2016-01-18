
using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IMobSocialService _mobSocialService;

        public FriendsController(IFriendService friendService, IPermissionService permissionService, IWorkContext workContext, IPictureService pictureService, ICustomerService customerService, IMobSocialService mobSocialService)
        {
            _friendService = friendService;
            _permissionService = permissionService;
            _workContext = workContext;
            _pictureService = pictureService;
            _customerService = customerService;
            _mobSocialService = mobSocialService;
        }

        [ChildActionOnly]
        public ActionResult AddFriendButton(int toCustomerId)
        {

            var model = new AddFriendButtonModel {
                CustomerProfileId = toCustomerId,
                CurrentCustomerId = _workContext.CurrentCustomer.Id
            };

            //retrieve customer friend object
            var customerFriend = _friendService.GetCustomerFriendship(_workContext.CurrentCustomer.Id, toCustomerId);
            FriendStatus friendStatus = FriendStatus.None;

            if (customerFriend == null)
                friendStatus = FriendStatus.None;
            else if (customerFriend.Confirmed)
                friendStatus = FriendStatus.Friends;
            else if (!customerFriend.Confirmed && customerFriend.FromCustomerId == _workContext.CurrentCustomer.Id)
                friendStatus = FriendStatus.FriendRequestSent;
            else if(_workContext.CurrentCustomer.Id == toCustomerId)
                friendStatus = FriendStatus.Self;
            else
                friendStatus = FriendStatus.NeedsConfirmed;



            model.ShowAddFriendButton = friendStatus == FriendStatus.None;
            model.ShowFriendsButton = friendStatus == FriendStatus.Friends;
            model.ShowConfirmFriendButton = friendStatus == FriendStatus.NeedsConfirmed;
            model.ShowFriendRequestSent = friendStatus == FriendStatus.FriendRequestSent;

            return View("mobSocial/Friends/_AddFriendButton", model);

        }

        [Authorize]
        public ActionResult FriendButton()
        {
            return View("mobSocial/Friends/FriendButton");
        }

        [Authorize]
        [HttpPost]
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


            return Json(new { Success = true, NewStatus = FriendStatus.FriendRequestSent });

        }

        [Authorize]
        [HttpPost]
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

            return Json(new { Success = true, NewStatus = FriendStatus.Friends });
        }

        [Authorize]
        [HttpPost]
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

            return Json(new { Success = true, NewStatus = FriendStatus.None });
        }

        [Authorize]
        public ActionResult FriendRequests()
        {
            return View("mobSocial/Friends/FriendRequests");
        }

        [HttpPost]
        public ActionResult GetFriendRequests()
        {
            var friendRequests = _friendService.GetCustomerFriendRequests(_workContext.CurrentCustomer.Id);

            var friendRequestCustomers =
                _customerService.GetCustomersByIds(friendRequests.Select(x => x.FromCustomerId).ToArray());

            var model = new List<FriendPublicModel>();
            foreach (var c in friendRequestCustomers)
            {
                var friendModel = new FriendPublicModel() {
                    Id = c.Id,
                    DisplayName = c.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        c.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId)),
                    ProfileUrl =
                        Url.RouteUrl("CustomerProfileUrl",
                            new { SeName = c.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                    FriendStatus = FriendStatus.NeedsConfirmed
                };
                model.Add(friendModel);

            }

            return Json(new { Success = true, People = model });
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

        public ActionResult SearchPeople(string searchTerm = "", bool excludeLoggedInUser = true, int page = 1, int count = 15)
        {
            var model = new FriendSearchModel() {
                SearchTerm = searchTerm,
                ExcludeLoggedInUser = excludeLoggedInUser,
                Count = count,
                Page = page
            };
            return View("mobSocial/Friends/SearchPeople", model);
        }

        [HttpPost]
        public ActionResult SearchPeople(FriendSearchModel model)
        {

            var customers = _mobSocialService.SearchPeople(model.SearchTerm, model.ExcludeLoggedInUser, model.Page, model.Count);
            var models = new List<object>();

            //get all the friends of logged in customer
            IList<CustomerFriend> friends = null;
            if (_workContext.CurrentCustomer.IsRegistered())
            {
                friends = _friendService.GetAllCustomerFriends(_workContext.CurrentCustomer.Id);
            }

            if (friends == null)
                friends = new List<CustomerFriend>();

            foreach (var c in customers)
            {
                var friendModel = new FriendPublicModel() {
                    Id = c.Id,
                    DisplayName = c.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        c.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId)),
                    ProfileUrl =
                        Url.RouteUrl("CustomerProfileUrl",
                            new { SeName = c.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                };

                var friend = friends.FirstOrDefault(x => x.FromCustomerId == c.Id || x.ToCustomerId == c.Id);

                if (friend == null)
                    friendModel.FriendStatus = FriendStatus.None;
                else if (friend.Confirmed)
                    friendModel.FriendStatus = FriendStatus.Friends;
                else if (!friend.Confirmed && friend.FromCustomerId == _workContext.CurrentCustomer.Id)
                    friendModel.FriendStatus = FriendStatus.FriendRequestSent;
                else if (_workContext.CurrentCustomer.Id == c.Id)
                    friendModel.FriendStatus = FriendStatus.Self;
                else
                    friendModel.FriendStatus = FriendStatus.NeedsConfirmed;
                models.Add(friendModel);
            }
            return Json(new { Success = true, People = models });
        }

    }
}