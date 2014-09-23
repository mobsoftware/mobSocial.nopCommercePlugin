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

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    // TODO: Consider making a single SocialNetworkWidget Controller for displaying widgets.
    public class CustomerProfileController : BasePublicController
    {
        private readonly CustomerProfileService _customerProfileService;
        private readonly CustomerProfileViewService _customerProfileViewService;
        private readonly IWorkContext _workContext;

        public CustomerProfileController(CustomerProfileService customerProfileService,
            CustomerProfileViewService customerProfileViewService,
            IWorkContext workContext)
        {
            _customerProfileService = customerProfileService;
            _customerProfileViewService = customerProfileViewService;
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
                IsLoggedInUsersProfile = _workContext.CurrentCustomer.Id == customerId
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







        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
           return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/AboutMe/PublicInfo.cshtml");
        }

    }
}
