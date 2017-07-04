using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class MediaController : MobSocialWidgetBaseController
    {
        public ActionResult MediaModal()
        {
            return View("mobSocial/Media/MediaModal");
        }
    }
}