using System.Linq;
using System.Web.Mvc;
using mobSocial.Core.Infrastructure.AppEngine;
using mobSocial.Data.Constants;
using mobSocial.Data.Entity.Users;
using mobSocial.Data.Enum;
using mobSocial.Services.Extensions;
using mobSocial.Services.MediaServices;
using mobSocial.Services.Social;
using mobSocial.Services.Users;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;
using Nop.Web.Models.Profile;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerProfileController : MobSocialWidgetBaseController
    {
        private readonly IWorkContext _workContext;
        public CustomerProfileController(IWorkContext workContext)
        {
            _workContext = workContext;
        }

        public ActionResult Index(int id)
        {
            return View("mobSocial/CustomerProfile/Index", id);
        }
        [ChildActionOnly]
        public ActionResult CustomerProfile(ProfileIndexModel model)
        {
            var customerId = model.CustomerProfileId;
            return View("mobSocial/CustomerProfile/Profile", customerId);
        }


        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
           return View("mobSocial/AboutMe/PublicInfo");
        }

    }
}
