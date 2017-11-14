using System.Web.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomFieldController : MobSocialWidgetBaseController
    {
        public ActionResult CustomField()
        {
            return View("mobSocial/CustomFields/CustomField");
        }
    }
}