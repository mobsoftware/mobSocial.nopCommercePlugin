using Nop.Services.Security;

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
        public IActionResult Index()
        {
            return View(ControllerUtil.MobSocialViewsFolder + "/Views/mobSocial/Admin/ManageTeamPage/List.cshtml");
        }
       
        #endregion


    }
}
