using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerLikeController : MobSocialWidgetBaseController
    {
        public IActionResult CustomerLikeButton()
        {
            return View("mobSocial/CustomerLike/CustomerLikeButton");
        }
    }
}