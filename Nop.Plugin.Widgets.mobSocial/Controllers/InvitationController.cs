using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class InvitationController : BasePublicController
    {
        public ActionResult Invite()
        {
            return View("mobSocial/Invitation/InvitationPage");
        }
    }
}