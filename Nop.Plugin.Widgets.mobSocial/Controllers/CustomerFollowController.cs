using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerFollowController : MobSocialWidgetBaseController
    {
        public IActionResult CustomerFollowButton()
        {
            return View("mobSocial/CustomerFollow/CustomerFollowButton");
        }


      
    }
}