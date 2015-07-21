using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class HeadController : BasePublicController
    {

        public HeadController()
        {
        }

        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
            return View(ControllerUtil.MobSocialViewsFolder + "/Head/PublicInfo.cshtml");
        }

    }
}
