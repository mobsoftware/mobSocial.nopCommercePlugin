using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class HeadController : MobSocialWidgetBaseController
    {

        public IActionResult PublicInfo(string widgetZone)
        {
            return View("mobSocial/Head/PublicInfo");
        }

    }
}
