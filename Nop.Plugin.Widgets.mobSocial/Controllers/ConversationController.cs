using Microsoft.AspNetCore.Mvc;
using Nop.Web.Framework.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class ConversationController : BaseController
    {
        public IActionResult ConversationBox()
        {
            return PartialView("mobSocial/WidgetZones/body_end_html_tag_before");
        }
    }
}