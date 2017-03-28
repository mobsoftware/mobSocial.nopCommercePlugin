using System.Web.Mvc;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SkillController : BasePublicController
    {
        private readonly ISkillService _skillService;
        public SkillController(ISkillService skillService)
        {
            _skillService = skillService;
        }

        public ActionResult Index(string seName)
        {
            var skill = _skillService.GetBySeName(seName);
            if (skill == null)
                return InvokeHttp404();

            var model = new SkillPageModel()
            {
                Description = skill.Description,
                Name = skill.Name,
                Slug = seName
            };

            return View("mobSocial/Skills/Single",model);
        }

        public ActionResult List()
        {
            return View("mobSocial/Skills/List");
        }
    }
}