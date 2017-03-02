using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SkillController : BasePublicController
    {

        public ActionResult Index(string seName)
        {
            return View("mobSocial/Skills/Single", (object) seName);
        }
    }
}