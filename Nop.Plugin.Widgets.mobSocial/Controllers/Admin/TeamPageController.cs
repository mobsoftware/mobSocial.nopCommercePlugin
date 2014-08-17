using System.Web.Mvc;
using Nop.Web.Controllers;
using Nop.Admin.Controllers;
using Nop.Web.Framework.Kendoui;
using Nop.Services.Security;
using Nop.Plugin.Widgets.MobSocial.Core;
using System.Collections.Generic;
using System.Linq;
using Nop.Web.Framework.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Admin.Controllers
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
            return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/Admin/TeamPage/Index.chstml");
        }
       
        #endregion


    }
}
