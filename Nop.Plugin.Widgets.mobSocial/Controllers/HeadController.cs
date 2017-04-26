using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class HeadController : BasePublicController
    {

        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
            return View("mobSocial/Head/PublicInfo");
        }

    }
}
