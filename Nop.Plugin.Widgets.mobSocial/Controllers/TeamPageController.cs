using System;
using System.Web.Mvc;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class TeamPageController : BasePublicController
    {
        public ActionResult Index(int teamId)
        {
            var model = new TeamPageModel()
            {
                Id = teamId
            };
            return View("mobSocial/TeamPage/Index", model);
        }

        public ActionResult TeamPageEditor(int id = 0)
        {
            var model = new TeamPageEditorModel()
            {
                Id = id
            };

            return View("mobSocial/TeamPage/TeamPageEditor", model);
        }
    }
}