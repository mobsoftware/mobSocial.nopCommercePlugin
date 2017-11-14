using System.Web.Mvc;
using Nop.Core;
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

        public ActionResult Register()
        {
            return View("mobSocial/User/Register");
        }
    }
}
