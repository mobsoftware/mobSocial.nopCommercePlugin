using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Admin.Controllers;
using System.Linq;
using Nop.Core;
using Nop.Core.Domain.Common;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Security;
using Nop.Web.Controllers;
using Nop.Web.Framework;
using Nop.Web.Models.Profile;
using Nop.Services.Customers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    // TODO: Consider making a single SocialNetworkWidget Controller for displaying widgets.
    public class CustomerProfileController : BasePublicController
    {
        private readonly CustomerProfileService _customerProfileService;
        private readonly CustomerProfileViewService _customerProfileViewService;
        private readonly ICustomerService _customerService;
        private readonly ICustomerFavoriteSongService _customerFavoriteSongService;
        private readonly IMobSocialService _mobSocialService;
        private readonly IWorkContext _workContext;
        private readonly IMusicService _musicService;

        public CustomerProfileController(CustomerProfileService customerProfileService,
            CustomerProfileViewService customerProfileViewService,
            ICustomerService customerService,
            IMobSocialService mobSocialService,
            ICustomerFavoriteSongService customerFavoriteSongService,
            IMusicService musicService,
            IWorkContext workContext)
        {
            _customerProfileService = customerProfileService;
            _customerProfileViewService = customerProfileViewService;
            _customerService = customerService;
            _customerFavoriteSongService = customerFavoriteSongService;
            _mobSocialService = mobSocialService;
            _musicService = musicService;
            _workContext = workContext;
        }

        public JsonResult GetCustomerProfile(int customerId)
        {

            _customerProfileViewService.IncrementViewCount(customerId);

            var profile = _customerProfileService.GetByCustomerId(customerId);
            
            var customerProfile = new CustomerProfileModel()
            {
                CustomerId = customerId,
                Views = _customerProfileViewService.GetViewCount(customerId),
                FriendCount = _customerProfileService.GetFriendCount(customerId),
                IsSelf = _workContext.CurrentCustomer.Id == customerId,
                IsFriend = _mobSocialService.GetFriendRequestStatus(_workContext.CurrentCustomer.Id, customerId) == FriendStatus.Friends,
                FavoriteSongs = _customerFavoriteSongService.GetTop10(customerId)
            };

            if (profile != null)
            {
                customerProfile.AboutMe = profile.AboutMe;
                customerProfile.Website = profile.Website;
                customerProfile.CreatedDate = profile.DateCreated;
                customerProfile.UpdatedDate = profile.DateUpdated;
            }

            return Json(customerProfile);

        }


        [HttpPost]
        public void SaveCustomerProfile(CustomerProfileModel customerProfile)
        {

            var profile = _customerProfileService.GetByCustomerId(customerProfile.CustomerId);
            
            if(profile == null)
            {
                profile = new CustomerProfile() {
                    CustomerId = customerProfile.CustomerId,
                    AboutMe = customerProfile.AboutMe,
                    Website = customerProfile.Website,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now,
                };

                _customerProfileService.Insert(profile);
                return;
            }
            else
            {
                profile.AboutMe = customerProfile.AboutMe;
                profile.Website = customerProfile.Website;
                profile.DateUpdated = DateTime.Now;
                _customerProfileService.Update(profile);
                return;
            }
            

        }


        [HttpPost]
        public void AddFavoriteSong(CustomerFavoriteSong favoriteSong)
        {
            var dateTimeNow = DateTime.Now;
            favoriteSong.DisplayOrder = 0;
            favoriteSong.DateCreated = dateTimeNow;
            favoriteSong.DateUpdated = dateTimeNow;

            _customerFavoriteSongService.Insert(favoriteSong);
        }

        [HttpPost]
        public void DeleteFavoriteSong(int id)
        {
            _customerFavoriteSongService.LogicalDelete(id);
        }


        [HttpPost]
        public void UpdateFavoriteSongOrder(int favoriteSongId, int displayOrder)
        {
            _customerFavoriteSongService.UpdateFavoriteSongOrder(favoriteSongId, displayOrder);
        }




        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
           return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/AboutMe/PublicInfo.cshtml");
        }

    }
}
