using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Nop.Admin.Controllers;
using System.Linq;
using System.Web;
using Mob.Core;
using Nop.Core;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.Plugin.WebApi.MobSocial.Domain;
using Nop.Plugin.WebApi.MobSocial.Enums;
using Nop.Plugin.WebApi.MobSocial.Models;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Services.Common;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Security;
using Nop.Web.Controllers;
using Nop.Web.Framework;
using Nop.Web.Models.Profile;
using Nop.Services.Customers;
using Nop.Services.Seo;
using SeoExtensions = Nop.Plugin.WebApi.MobSocial.Extensions.SeoExtensions;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerProfileController : BasePublicController
    {
        private readonly CustomerProfileService _customerProfileService;
        private readonly CustomerProfileViewService _customerProfileViewService;
        private readonly ICustomerService _customerService;
        private readonly ICustomerFavoriteSongService _customerFavoriteSongService;
        private readonly IMobSocialService _mobSocialService;
        private readonly IWorkContext _workContext;
        private readonly IMusicService _musicService;
        private readonly IFriendService _friendService;
        private readonly IPictureService _pictureService;
        private readonly IGenericAttributeService _genericAttributeService;
        private readonly ICustomerFollowService _customerFollowService;
        private readonly MediaSettings _mediaSettings;
        private readonly mobSocialSettings _mobSocialSettings;

        public CustomerProfileController(CustomerProfileService customerProfileService,
            CustomerProfileViewService customerProfileViewService,
            ICustomerService customerService,
            IMobSocialService mobSocialService,
            ICustomerFavoriteSongService customerFavoriteSongService,
            IMusicService musicService,
            IWorkContext workContext, IFriendService friendService, IPictureService pictureService, mobSocialSettings mobSocialSettings, MediaSettings mediaSettings, IGenericAttributeService genericAttributeService, ICustomerFollowService customerFollowService)
        {
            _customerProfileService = customerProfileService;
            _customerProfileViewService = customerProfileViewService;
            _customerService = customerService;
            _customerFavoriteSongService = customerFavoriteSongService;
            _mobSocialService = mobSocialService;
            _musicService = musicService;
            _workContext = workContext;
            _friendService = friendService;
            _pictureService = pictureService;
            _mobSocialSettings = mobSocialSettings;
            _mediaSettings = mediaSettings;
            _genericAttributeService = genericAttributeService;
            _customerFollowService = customerFollowService;
        }

        [ChildActionOnly]
        public ActionResult CustomerProfile(ProfileIndexModel model)
        {
            var customerId = model.CustomerProfileId;
            //increment view count
            _customerProfileViewService.IncrementViewCount(customerId);

            //get customer object
            var customer = _customerService.GetCustomerById(customerId);
            if (customer == null)
            {
                return null;
            }
            var profile = _customerProfileService.GetByCustomerId(customerId);

            var customerSeName = SeoExtensions.GetSeName(customer, _workContext.WorkingLanguage.Id, true, false);
            var profilemodel = new CustomerProfilePublicModel() {
                CustomerId = customerId,
                ViewCount = _customerProfileViewService.GetViewCount(customerId),
                FriendCount = _customerProfileService.GetFriendCount(customerId),
                CustomerName = customer.GetFullName(),
                SeName = customerSeName,
                ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customerSeName }),
                ProfileImageUrl = _pictureService.GetPictureUrl(customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId), _mediaSettings.AvatarPictureSize, true),
                CoverImageUrl = _pictureService.GetPictureUrl(customer.GetAttribute<int>(AdditionalCustomerAttributeNames.CoverImageId)),
                ProfileIndexModel = model
            };

            if (_workContext.CurrentCustomer.Id == customerId)
            {
                profilemodel.FriendStatus = FriendStatus.Self;
                profilemodel.IsEditable = true;
            }
            else
            {
                //depending on who is viewing the profile, let's set the friend status and other relevent values
                var customerFriend = _friendService.GetCustomerFriendship(_workContext.CurrentCustomer.Id, customer.Id);
                if (customerFriend == null)
                    profilemodel.FriendStatus = FriendStatus.None;
                else if (customerFriend.Confirmed)
                    profilemodel.FriendStatus = FriendStatus.Friends;
                else if (!customerFriend.Confirmed && customerFriend.FromCustomerId == _workContext.CurrentCustomer.Id)
                    profilemodel.FriendStatus = FriendStatus.FriendRequestSent;
                else
                    profilemodel.FriendStatus = FriendStatus.NeedsConfirmed;
            }

           //and the follower counts & logged in user following status
            var followers = _customerFollowService.GetFollowers<CustomerProfile>(customerId);
            profilemodel.FollowingStatus = followers.Any(x => x.CustomerId == _workContext.CurrentCustomer.Id) ? 1 : 0;
            profilemodel.FollowerCount = followers.Count;
            return View("mobSocial/CustomerProfile/Profile", profilemodel);
        }


        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
           return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/AboutMe/PublicInfo.cshtml");
        }

    }
}
