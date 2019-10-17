using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomFieldController : MobSocialWidgetBaseController
    {
        public IActionResult CustomField()
        {
            return View("mobSocial/CustomFields/CustomField");
        }
    }
}