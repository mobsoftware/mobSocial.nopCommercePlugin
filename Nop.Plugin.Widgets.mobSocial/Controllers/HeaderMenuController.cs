using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class HeaderMenuController : MobSocialWidgetBaseController
    {
        public IActionResult PublicInfo(string widgetZone)
        {
            return View("mobSocial/HeaderMenu/PublicInfo");
        }

    }
}
