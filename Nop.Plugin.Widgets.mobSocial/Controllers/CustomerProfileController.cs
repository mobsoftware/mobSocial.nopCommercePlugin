using Microsoft.AspNetCore.Mvc;
using Nop.Web.Models.Profile;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerProfileController : MobSocialWidgetBaseController
    {
        public IActionResult Index(int id)
        {
            return View("mobSocial/CustomerProfile/Index", id);
        }
        
        public IActionResult CustomerProfile(ProfileIndexModel model)
        {
            var customerId = model.CustomerProfileId;
            return View("mobSocial/CustomerProfile/Profile", customerId);
        }


        public IActionResult PublicInfo(string widgetZone)
        {
           return View("mobSocial/AboutMe/PublicInfo");
        }

        public IActionResult Register()
        {
            return View("mobSocial/User/Register");
        }
    }
}
