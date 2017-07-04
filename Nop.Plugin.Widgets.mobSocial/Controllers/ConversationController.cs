using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class ConversationController : BasePublicController
    {
        [ChildActionOnly]
        public ActionResult ConversationBox()
        {
            return PartialView("mobSocial/WidgetZones/body_end_html_tag_before");
        }
    }
}