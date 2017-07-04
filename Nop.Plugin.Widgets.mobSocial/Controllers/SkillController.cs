using System.Web.Mvc;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SkillController : MobSocialWidgetBaseController
    {
        private readonly IWorkContext _workContext;
        public SkillController(IWorkContext workContext)
        {
            _workContext = workContext;
        }

        public ActionResult Index(string seName)
        {
           
            var model = new SkillPageModel()
            {
                Description = "",
                Name = "",
                Slug = seName
            };
            return View("mobSocial/Skills/Single",model);
        }

        public ActionResult List()
        {
            return View("mobSocial/Skills/List");
        }

        public ActionResult SkillEditorButton()
        {
            return View("mobSocial/Skills/SkillEditorButton");
        }

        public ActionResult UserSkills(int userId)
        {
            return View("mobSocial/Skills/UserSkills", userId);
        }
    }
}