using System.Web.Mvc;
using mobSocial.Services.TeamPages;
using Nop.Admin.Controllers;
using Nop.Services.Security;
using Nop.Web.Framework.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers.Admin
{
    public partial class TeamPageController : BaseAdminController
    {
        
        #region Fields
        private readonly ITeamPageService _teamPageService;
        private readonly IPermissionService _permissionService;
        #endregion

        #region Constructors

        public TeamPageController(IPermissionService permissionService, ITeamPageService teamPageService)
        {
            _permissionService = permissionService;
            _teamPageService = teamPageService;
        }

        #endregion


        #region Methods

        [AdminAuthorize]
        public ActionResult Index()
        {
            return View(ControllerUtil.MobSocialViewsFolder + "/Views/mobSocial/Admin/ManageTeamPage/List.cshtml");
        }
       
        #endregion


    }
}
