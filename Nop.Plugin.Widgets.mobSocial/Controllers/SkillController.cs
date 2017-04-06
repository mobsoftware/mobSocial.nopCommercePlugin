using System.Web.Mvc;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SkillController : BasePublicController
    {
        private readonly ISkillService _skillService;
        private readonly IWorkContext _workContext;
        private readonly IUserSkillService _userSkillService;
        public SkillController(ISkillService skillService, IWorkContext workContext, IUserSkillService userSkillService)
        {
            _skillService = skillService;
            _workContext = workContext;
            _userSkillService = userSkillService;
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

            //check if the logged in user has this skill?
            if (!_workContext.CurrentCustomer.IsGuest())
            {
                var userSkill =
                    _userSkillService.FirstOrDefault(
                        x => x.UserId == _workContext.CurrentCustomer.Id && x.SkillId == skill.Id);
                if (userSkill != null)
                {
                    model.UserSkillId = userSkill.Id;
                }
            }
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
    }
}