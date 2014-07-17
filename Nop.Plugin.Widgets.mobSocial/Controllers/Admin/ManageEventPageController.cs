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
    public partial class ManageEventPageController : BaseAdminController
    {
        
        #region Fields
        private readonly IEventPageService _eventPageService;
        private readonly IPermissionService _permissionService;
        #endregion

        #region Constructors

        public ManageEventPageController(IPermissionService permissionService, IEventPageService eventPageService)
        {
            _permissionService = permissionService;
            _eventPageService = eventPageService;
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

            var items = _eventPageService.GetAll();

            var models = new List<object>();

            foreach(var item in items)
            {
                var model = new {
                    FriendlyName = item.Name,
                    SystemName = item.Name,
                    IsPrimaryTaxProvider = false
                };

                models.Add(model);
            }

            
            var gridModel = new DataSourceResult
            {
                Data = models,
                Total = items.Count()
            };

            return Json(gridModel);
        }

        [AdminAuthorize]
        public ActionResult Index()
        {
            return View("Index");
        }
       
        #endregion


    }
}
