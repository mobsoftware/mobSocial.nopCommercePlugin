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
using Nop.Services.Media;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Admin.Controllers
{
    public partial class ManageEventPageController : BaseAdminController
    {
        
        #region Fields
        private readonly BaseService<EventPage, EventPagePicture> _eventPageService;
        private readonly IPermissionService _permissionService;
        private readonly IWorkContext _workContext;
        private readonly IUrlRecordService _urlRecordService;
        private readonly ILocalizationService _localizationService;
        private readonly ICustomerActivityService _customerActivityService;
        private readonly IPictureService _pictureService;
        private readonly IEventPageHotelService _eventPageHotelService;
        #endregion

        #region Constructors

        public ManageEventPageController(IPermissionService permissionService,
            BaseService<EventPage, EventPagePicture> eventPageService,
            IWorkContext workContext,
            IUrlRecordService urlRecordService,
            ILocalizationService localizationService,
            ICustomerActivityService customerActivityService,
            IPictureService pictureService,
            IEventPageHotelService eventPageHotelService)
        {
            _permissionService = permissionService;
            _eventPageService = eventPageService;
            _workContext = workContext;
            _urlRecordService = urlRecordService;
            _localizationService = localizationService;
            _customerActivityService = customerActivityService;
            _pictureService = pictureService;
            _eventPageHotelService = eventPageHotelService;
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

            var entities = _eventPageService.GetAll();

            var models = new List<object>();

            foreach(var entity in entities)
            {
                var entityPicture = _eventPageService.GetFirstPicture(entity.Id);
                var defaultPicture = (entityPicture != null) ? _pictureService.GetPictureById(entityPicture.PictureId) : null;

                var model = new {
                    Id = entity.Id,
                    PictureThumbnailUrl = _pictureService.GetPictureUrl(defaultPicture, 75, true),
                    Name = entity.Name,
                    Address = entity.LocationName + " " + entity.LocationAddress1 + " " + entity.LocationAddress2 + " " + 
                              entity.LocationCity + ", " + entity.LocationState + " " + 
                              entity.LocationZipPostalCode + " " + entity.LocationCountry,
                    LocationContactInfo = entity.LocationPhone + " " + entity.LocationEmail + " " + entity.LocationWebsite,
                    StartDate = entity.StartDate,
                    EndDate = entity.EndDate,
                    DateCreated = entity.DateCreated.ToString(),
                    DateUpdated = entity.DateUpdated.ToString(),
                };

                models.Add(model);
            }

            
            var gridModel = new DataSourceResult
            {
                Data = models,
                Total = entities.Count()
            };

            return Json(gridModel);
        }

        [AdminAuthorize]
        public ActionResult List()
        {
            return View("List");
        }

        [AdminAuthorize]
        public ActionResult Create()
        {
            // todo add permissions later
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            var model = new EventPageModel();
            return View(model);
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
                LocationName = item.LocationName,
                LocationAddress1 = item.LocationAddress1,
                LocationAddress2 = item.LocationAddress2,
                LocationCity = item.LocationCity,
                LocationState = item.LocationState,
                LocationZipPostalCode = item.LocationZipPostalCode,
                LocationCountry = item.LocationCountry,
                LocationPhone = item.LocationPhone,
                LocationWebsite = item.LocationWebsite,
                LocationEmail = item.LocationEmail,
                StartDate = item.StartDate,
                EndDate = item.EndDate,
                DateCreated = item.DateCreated,
                DateUpdated = item.DateUpdated,
            };

            return View("Edit", model);

        }

        [HttpPost, ParameterBasedOnFormName("save-continue", "continueEditing")]
        public ActionResult Create(EventPageModel model, bool continueEditing)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            if (ModelState.IsValid)
            {
                var entity = new EventPage()
                {
                    Name = model.Name,
                    LocationName = model.LocationName,
                    LocationAddress1 = model.LocationAddress1,
                    LocationAddress2 = model.LocationAddress2,
                    LocationCity = model.LocationCity,
                    LocationState = model.LocationState,
                    LocationZipPostalCode = model.LocationZipPostalCode,
                    LocationPhone = model.LocationPhone,
                    LocationWebsite = model.LocationWebsite,
                    LocationEmail = model.LocationEmail,
                    LocationCountry = model.LocationCountry,
                    StartDate = model.StartDate,
                    EndDate = model.EndDate,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now,
                };

                // todo: add event hosts
                _eventPageService.Insert(entity);

                //save hotels
                //SaveEventHotels(product, ParseProductTags(model.ProductTags));
                
                //activity log
                //_customerActivityService.InsertActivity("AddNewProduct", _localizationService.GetResource("ActivityLog.AddNewProduct"), product.Name);
                _customerActivityService.InsertActivity("AddNewEventPage", _localizationService.GetResource("ActivityLog.AddNewEventPage"), entity.Name);


                SuccessNotification(_localizationService.GetResource("Admin.MobSocial.EventPage.Added"));

                return continueEditing ? RedirectToAction("Edit", new { id = entity.Id }) : RedirectToAction("List");
            }
            
            return View(model);

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
                item.LocationName = model.LocationName;
                item.LocationAddress1 = model.LocationAddress1;
                item.LocationAddress2 = model.LocationAddress2;
                item.LocationCity = model.LocationCity;
                item.LocationState = model.LocationState;
                item.LocationZipPostalCode = model.LocationZipPostalCode;
                item.LocationCountry = model.LocationCountry;
                item.LocationPhone = model.LocationPhone;
                item.LocationWebsite = model.LocationWebsite;
                item.LocationEmail = model.LocationEmail;
                item.StartDate = model.StartDate;
                item.EndDate = model.EndDate;
                item.DateUpdated = DateTime.Now;


                

                _eventPageService.Update(item);

                //search engine name
                model.SeName = item.GetSeName(_workContext.WorkingLanguage.Id);

                _urlRecordService.SaveSlug(item, model.SeName, _workContext.WorkingLanguage.Id);

                //picture seo names
                //UpdatePictureSeoNames(product);

                SuccessNotification(_localizationService.GetResource("Admin.MobSocial.EventPage.Updated"));

                if (continueEditing)
                {
                    //selected tab
                    SaveSelectedTabIndex();

                    return RedirectToAction("Edit", new { id = item.Id });
                }
                else
                {
                    return RedirectToAction("List");
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

            SuccessNotification(_localizationService.GetResource("Admin.MobSocial.EventPage.Deleted"));
            return RedirectToAction("List");
        }





       
        #endregion


        #region Pictures
        public ActionResult PictureAdd(int pictureId, int displayOrder, int entityId)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            if (pictureId == 0)
                throw new ArgumentException();

            var entity = _eventPageService.GetById(entityId);
            if (entity == null)
                throw new ArgumentException("No event page found with the specified id");

            // ...

            _eventPageService.InsertPicture(new EventPagePicture()
            {
                PictureId = pictureId,
                EventPageId = entityId,
                DisplayOrder = displayOrder,
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now
            });

            _pictureService.SetSeoFilename(pictureId, _pictureService.GetPictureSeName(entity.Name));

            return Json(new { Result = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PictureList(DataSourceRequest command, int entityId)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            // TODO: We may want to support vendors and multiple stores in the future

            var pictures = _eventPageService.GetAllPictures(entityId);

            var picturesModel = pictures
                .Select(x =>
                {
                    return new EventPagePictureModel()
                    {
                        Id = x.Id,
                        EventPageId = x.EventPageId,
                        PictureId = x.PictureId,
                        PictureUrl = _pictureService.GetPictureUrl(x.PictureId),
                        DisplayOrder = x.DisplayOrder
                    };
                })
                .ToList();

            var gridModel = new DataSourceResult
            {
                Data = picturesModel,
                Total = picturesModel.Count
            };

            return Json(gridModel);
        }

        [HttpPost]
        public ActionResult PictureUpdate(EventPagePictureModel model)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            var picture = _eventPageService.GetPictureById(model.Id);
            if (picture == null)
                throw new ArgumentException("No picture found with the specified id");

            picture.DisplayOrder = model.DisplayOrder;
            picture.DateUpdated = DateTime.Now;

            _eventPageService.UpdatePicture(picture);

            return new NullJsonResult();
        }

        [HttpPost]
        public ActionResult PictureDelete(int id)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            var entityPicture = _eventPageService.GetPictureById(id);
            if (entityPicture == null)
                throw new ArgumentException("No picture found with the specified id");

            var pictureId = entityPicture.PictureId;

            _eventPageService.DeletePicture(entityPicture);
            var picture = _pictureService.GetPictureById(pictureId);
            _pictureService.DeletePicture(picture);

            return new NullJsonResult();
        }
        #endregion



        #region Hotels
        public ActionResult HotelAdd(EventPageHotelModel model)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            if (model == null)
                throw new ArgumentException();


            var entity = new EventPageHotel()
            {
                EventPageId = model.EventPageId,
                Title = model.Title,
                Name = model.Name,
                Address1 = model.Address1,
                Address2 = model.Address2,
                City = model.City,
                State = model.State,
                ZipPostalCode = model.ZipPostalCode,
                Country = model.Country,
                PhoneNumber = model.PhoneNumber,
                AdditionalInformation = model.AdditionalInformation,
                DisplayOrder = model.DisplayOrder,
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now,
            };


            _eventPageHotelService.Insert(entity);

            return Json(new { Result = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult HotelList(DataSourceRequest command, int eventPageId)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            var hotels = _eventPageService.GetById(eventPageId).Hotels;

            var model = hotels
                .Select(x =>
                {
                    return new EventPageHotelModel()
                    {
                        Id = x.Id,
                        EventPageId = x.EventPageId,
                        Title = x.Title,
                        Name = x.Name,
                        Address1 = x.Address1,
                        Address2 = x.Address2,
                        City = x.City,
                        State = x.State,
                        ZipPostalCode = x.ZipPostalCode,
                        Country = x.Country,
                        PhoneNumber = x.PhoneNumber,
                        DisplayOrder = x.DisplayOrder,
                        AdditionalInformation = x.AdditionalInformation
                    };
                })
                .ToList();

            var gridModel = new DataSourceResult
            {
                Data = model,
                Total = model.Count
            };

            return Json(gridModel);
        }

        [HttpPost]
        public ActionResult HotelUpdate(EventPageHotelModel model)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            var hotel = _eventPageHotelService.GetById(model.Id);

            if (hotel == null)
                throw new ArgumentException("No hotel found with the specified id");

            hotel.Name = model.Name;
            hotel.DisplayOrder = model.DisplayOrder;
            hotel.DateUpdated = DateTime.Now;

            _eventPageHotelService.Update(hotel);

            return new NullJsonResult();
        }

        [HttpPost]
        public ActionResult HotelDelete(int id)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageProducts))
            //    return AccessDeniedView();

            var hotel = _eventPageHotelService.GetById(id);

            if (hotel == null)
                throw new ArgumentException("No hotel found with the specified id");

            _eventPageHotelService.Delete(hotel);

            return new NullJsonResult();
        }
        #endregion



    }
}
