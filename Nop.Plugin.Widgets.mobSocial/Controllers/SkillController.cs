using Microsoft.AspNetCore.Mvc;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SkillController : MobSocialWidgetBaseController
    {
        private readonly IWorkContext _workContext;
        public SkillController(IWorkContext workContext)
        {
            _workContext = workContext;
        }

        public IActionResult Index(string seName)
        {
           
            var model = new SkillPageModel()
            {
                Description = "",
                Name = "",
                Slug = seName
            };
            return View("mobSocial/Skills/Single",model);
        }

        public IActionResult List()
        {
            return View("mobSocial/Skills/List");
        }

        public IActionResult SkillEditorButton()
        {
            return View("mobSocial/Skills/SkillEditorButton");
        }

        public IActionResult UserSkills(int userId)
        {
            return View("mobSocial/Skills/UserSkills", userId);
        }
    }
}