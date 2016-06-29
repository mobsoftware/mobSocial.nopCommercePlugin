using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Nop.Admin.Controllers;
using Nop.Plugin.WebApi.MobSocial.Constants;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Services.Security;
using Nop.Web.Framework.Controllers;
using Nop.Web.Framework.Kendoui;

namespace Nop.Plugin.Widgets.MobSocial.Controllers.Admin
{
    public partial class TeamPageController : BaseAdminController
    {
        
        #region Fields
        private readonly TeamPageService _teamPageService;
        private readonly IPermissionService _permissionService;
        #endregion

        #region Constructors

        public TeamPageController(IPermissionService permissionService, TeamPageService teamPageService)
        {
            _permissionService = permissionService;
            _teamPageService = teamPageService;
        }

        #endregion

        #region Utilities

        //page not found
        public ActionResult PageNotFound()
        {
            this.Response.StatusCode = 404;
            this.Response.TrySkipIisCustomErrors = true;

            return View();
        }

     

        #endregion

        #region Methods

        [HttpPost]
        public ActionResult GetAll(DataSourceRequest command)
        {

            var teams = _teamPageService.GetAll();

            var models = new List<object>();

            foreach(var team in teams)
            {
                var model = new {
                    FriendlyName = team.Name,
                    SystemName = team.Description,
                    IsPrimaryTaxProvider = team.CreatedBy
                };

                models.Add(model);
            }

            
            var gridModel = new DataSourceResult
            {
                Data = models,
                Total = teams.Count()
            };

            return Json(gridModel);
        }

        [AdminAuthorize]
        public ActionResult Index()
        {
            return View(MobSocialConstant.ViewsPath + "/Views/mobSocial/Admin/ManageTeamPage/List.cshtml");
        }
       
        #endregion


    }
}
