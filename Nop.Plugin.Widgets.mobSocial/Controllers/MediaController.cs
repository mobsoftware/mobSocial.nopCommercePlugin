using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class MediaController : MobSocialWidgetBaseController
    {
        public IActionResult MediaModal()
        {
            return View("mobSocial/Media/MediaModal");
        }
    }
}