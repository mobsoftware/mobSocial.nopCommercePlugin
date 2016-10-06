using System.Web.Mvc;
using Nop.Plugin.WebApi.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class InvitationController : BasePublicController
    {
        public ActionResult Invite()
        {
            var model = new InvitationPageModel()
            {
                ActionUrl = InvitationHelpers.GetInvitationUrl()
            };
            return View("mobSocial/Invitation/InvitationPage", model);
        }
    }
}