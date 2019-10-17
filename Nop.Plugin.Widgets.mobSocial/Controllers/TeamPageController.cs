using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class TeamPageController : MobSocialWidgetBaseController
    {
        public IActionResult Index(int teamId)
        {
            var model = new TeamPageModel()
            {
                Id = teamId
            };
            return View("mobSocial/TeamPage/Index", model);
        }
        [Authorize]
        public IActionResult TeamPageEditor(int id = 0)
        {
            var model = new TeamPageEditorModel()
            {
                Id = id
            };

            return View("mobSocial/TeamPage/TeamPageEditor", model);
        }
        [Authorize]
        public IActionResult MyPages()
        {
            return View("mobSocial/TeamPage/MyPages");
        }
    }
}