using System.Web.Mvc;
using Nop.Web.Controllers;
using Nop.Admin.Controllers;
using Nop.Web.Framework.Kendoui;
using Nop.Services.Security;
using Nop.Plugin.Widgets.MobSocial.Core;
using System.Collections.Generic;
using System.Linq;
using Nop.Web.Framework.Controllers;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Core;
using Nop.Services.Seo;
using Nop.Services.Localization;
using Nop.Services.Logging;
using System;

namespace Nop.Plugin.Widgets.MobSocial.Admin.Controllers
{
    public partial class ManageEventPageController : BaseAdminController
    {
        
        #region Fields
        private readonly IEventPageService _eventPageService;
        private readonly IPermissionService _permissionService;
        private readonly IWorkContext _workContext;
        private readonly IUrlRecordService _urlRecordService;
        private readonly ILocalizationService _localizationService;
        private readonly ICustomerActivityService _customerActivityService;
        #endregion

        #region Constructors

        public ManageEventPageController(IPermissionService permissionService, 
            IEventPageService eventPageService,
            IWorkContext workContext,
            IUrlRecordService urlRecordService,
            ILocalizationService localizationService,
            ICustomerActivityService customerActivityService)
        {
            _permissionService = permissionService;
            _eventPageService = eventPageService;
            _workContext = workContext;
            _urlRecordService = urlRecordService;
            _localizationService = localizationService;
            _customerActivityService = customerActivityService;
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
                    Id = item.Id,
                    PictureThumbnailUrl = "",
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

        [AdminAuthorize]
        public ActionResult Edit(int id)
        {
            //todo: add later
            //if (!_permissionService.Authorize(MobSocialPermissionProvider.ManageEventPages))
            //    return AccessDeniedView();

            var item = _eventPageService.GetById(id);

            if (item == null) //Not found
                return RedirectToAction("List");


            var model = new EventPageModel()
            {
                Id = item.Id,
                Name = item.Name,
                SeName = item.GetSeName(0),
                Address1 = item.Address1,
                Address2 = item.Address2,
                ZipPostalCode = item.ZipPostalCode,
                DateCreated = item.DateCreated,
                DateUpdated = item.DateUpdated,
            };

            return View("Edit", model);

        }




        [HttpPost, ParameterBasedOnFormName("save-continue", "continueEditing")]
        public ActionResult Edit(EventPageModel model, bool continueEditing)
        {
            //todo: add later
            //if (!_permissionService.Authorize(MobSocialPermissionProvider.ManageEventPages))
            //    return AccessDeniedView();

            var item = _eventPageService.GetById(model.Id);
            if (item == null)
                //No product found with the specified id
                return RedirectToAction("List");

            if (ModelState.IsValid)
            {


                item.Name = model.Name;
                item.Address1 = model.Address1;
                item.Address2 = model.Address2;
                item.ZipPostalCode = model.ZipPostalCode;
                item.DateUpdated = DateTime.Now;

                _eventPageService.Update(item);

                //search engine name
                model.SeName = item.GetSeName(_workContext.WorkingLanguage.Id);

                _urlRecordService.SaveSlug(item, model.SeName, _workContext.WorkingLanguage.Id);

                //picture seo names
                //UpdatePictureSeoNames(product);

                SuccessNotification(_localizationService.GetResource("Admin.EventPage.Updated"));

                if (continueEditing)
                {
                    //selected tab
                    SaveSelectedTabIndex();

                    return RedirectToAction("Edit", new { id = item.Id });
                }
                else
                {
                    return RedirectToAction("Index");
                }
            }

            return View(model);
        }

        //delete product
        [HttpPost]
        public ActionResult Delete(int id)
        {
            //todo: add later
            //if (!_permissionService.Authorize(MobSocialPermissionProvider.ManageEventPages))
            //    return AccessDeniedView();


            var item = _eventPageService.GetById(id);
            if (item == null)
                return RedirectToAction("List");

        
            _eventPageService.Delete(item);

            //activity log
            _customerActivityService.InsertActivity("DeleteEventPage", _localizationService.GetResource("ActivityLog.DeleteEventPage"), item.Name);

            SuccessNotification(_localizationService.GetResource("Admin.EventPage.Deleted"));
            return RedirectToAction("Index");
        }





       
        #endregion


    }
}
