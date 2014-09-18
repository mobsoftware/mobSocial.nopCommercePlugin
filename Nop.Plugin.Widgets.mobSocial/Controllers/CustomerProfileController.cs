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

        public CustomerProfileController(CustomerProfileService customerProfileService)
        {
            _customerProfileService = customerProfileService;
        }


        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone, ProfileInfoModel additionalData)
        {

           var profile = _customerProfileService.GetByCustomerId(additionalData.CustomerProfileId);

           var model = new CustomerProfileModel()
           {
               CustomerId = profile.CustomerId,
               AboutMe = profile.AboutMe,
               CreatedDate = profile.DateCreated,
               UpdatedDate = profile.DateUpdated
           };

           return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/AboutMe/PublicInfo.cshtml", model);

        }

    }
}
