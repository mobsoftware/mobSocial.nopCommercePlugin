using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Forums;
using Nop.Core.Domain.Media;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Directory;
using Nop.Services.Forums;
using Nop.Services.Helpers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Seo;
using Nop.Web.Framework;
using Nop.Web.Framework.Security;
using Nop.Web.Models.Common;
using Nop.Web.Models.Profile;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;
using System.Linq;
using System.Web;
using Mob.Core;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class BusinessPageController : BasePublicController
    {
        private readonly ILocalizationService _localizationService;
        private readonly IPictureService _pictureService;
        private readonly ICountryService _countryService;
        private readonly ICustomerService _customerService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly ForumSettings _forumSettings;
        private readonly CustomerSettings _customerSettings;
        private readonly MediaSettings _mediaSettings;
        private readonly IBusinessPageService _businessPageService;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly IEventPageAttendanceService _eventPageAttendanceService;
        private readonly IWorkContext _workContext;
        private readonly IMobSocialService _mobSocialService;
        private readonly IStateProvinceService _stateProvinceService;


        public BusinessPageController(IForumService forumService, ILocalizationService localizationService,
            IPictureService pictureService, ICountryService countryService,
            ICustomerService customerService, IDateTimeHelper dateTimeHelper,
            ForumSettings forumSettings, CustomerSettings customerSettings,
            MediaSettings mediaSettings, IBusinessPageService businessPageService,
            mobSocialSettings mobSocialSettings, IEventPageAttendanceService eventPageAttendanceService,
            IMobSocialService mobSocialService, IWorkContext workContext, IStateProvinceService stateProvinceService)
        {
            _localizationService = localizationService;
            _pictureService = pictureService;
            _countryService = countryService;
            _customerService = customerService;
            _dateTimeHelper = dateTimeHelper;
            _forumSettings = forumSettings;
            _customerSettings = customerSettings;
            _mediaSettings = mediaSettings;
            _businessPageService = businessPageService;
            _eventPageAttendanceService = eventPageAttendanceService;
            _mobSocialSettings = mobSocialSettings;
            _mobSocialService = mobSocialService;
            _workContext = workContext;
            _stateProvinceService = stateProvinceService;
        }

        public ActionResult Index(int? id, int? page)
        {

            if (!_customerSettings.AllowViewingProfiles)
            {
                return RedirectToRoute("HomePage");
            }

            var entityId = 0;
            if (id.HasValue)
            {
                entityId = id.Value;
            }

            var entity = _businessPageService.GetById(entityId);
            if (entity == null)
            {
                return RedirectToRoute("HomePage");
            }

            var model = new BusinessPageModel()
            {
                Id = entity.Id,
                Name = entity.Name,
                Address1 = entity.Address1,
                Address2 = entity.Address2,
                City = entity.City,
                State = (entity.StateProvinceId != null) ? _stateProvinceService.GetStateProvinceById(entity.StateProvinceId).Name : string.Empty,
                StateProvinceId = entity.StateProvinceId,
                ZipPostalCode = entity.ZipPostalCode,
                CountryId = entity.CountryId,
                Phone = entity.Phone,
                Email = entity.Email,
                Website = entity.Website,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Description = entity.Description,
                MetaKeywords = entity.MetaKeywords,
                MetaDescription = entity.MetaDescription,
                DateCreated = entity.DateCreated,
                DateUpdated = entity.DateUpdated,
            };


            foreach (var coupon in entity.Coupons)
            {
                model.Coupons.Add(new BusinessPageCouponModel
                {
                    Id = coupon.Id,
                    Name = coupon.Name,
                    Title = coupon.Title,
                    Disclaimer = coupon.Disclaimer,
                    DisplayOrder = coupon.DisplayOrder
                });
            }

            foreach (var picture in entity.Pictures)
            {
                model.Pictures.Add(new PictureModel
                {
                    Id = picture.Id,
                    EntityId = entity.Id,
                    PictureId = picture.PictureId,
                    DisplayOrder = picture.DisplayOrder,
                    DateCreated = picture.DateCreated,
                    DateUpdated = picture.DateUpdated,
                    PictureUrl = _pictureService.GetPictureUrl(picture.PictureId, 200),
                });
            }


            if (entity.Pictures.Count > 0)
            {
                model.MainPictureUrl = model.Pictures.First().PictureUrl;
                model.FullSizeImageUrl = _pictureService.GetPictureUrl(model.Pictures.First().PictureId);
            }
            else
            {
                model.MainPictureUrl = _pictureService.GetDefaultPictureUrl(200);
                model.FullSizeImageUrl = _pictureService.GetDefaultPictureUrl();
            }


            // security
            //TODO: Trust community to update.
            model.CanEdit = _workContext.IsAdmin;

            return View(ControllerUtil.MobSocialViewsFolder + "/BusinessPage/Index.cshtml", model);

        }

        [HttpPost]
        public ActionResult GetGoing(int eventPageId)
        {

            var going = _eventPageAttendanceService.GetAllGoing(eventPageId);


            if (going.Count == 0)
                return Json(null);

            var goingCustomers = _customerService.GetCustomersByIds(going.Select(x => x.CustomerId).ToArray());

            var models = new List<object>();

            foreach (var customer in goingCustomers)
            {
                models.Add(new
                {
                    CustomerId = customer.Id,
                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new {SeName = customer.GetSeName(0)}),

                });
            }

            return Json(models);

        }

        [HttpPost]
        public ActionResult GetNotGoing(int eventPageId)
        {

            var notGoing = _eventPageAttendanceService.GetAllNotGoing(eventPageId);


            if (notGoing.Count == 0)
                return Json(null);

            var notGoingCustomers = _customerService.GetCustomersByIds(notGoing.Select(x => x.CustomerId).ToArray());

            var models = new List<object>();

            foreach (var customer in notGoingCustomers)
            {
                models.Add(new
                {
                    CustomerId = customer.Id,
                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new {SeName = customer.GetSeName(0)}),

                });
            }

            return Json(models);

        }

        [HttpPost]
        public ActionResult GetMaybe(int eventPageId)
        {

            var maybe = _eventPageAttendanceService.GetAllMaybies(eventPageId);


            if (maybe.Count == 0)
                return Json(null);

            var maybeCustomers = _customerService.GetCustomersByIds(maybe.Select(x => x.CustomerId).ToArray());

            var models = new List<object>();

            foreach (var customer in maybeCustomers)
            {
                models.Add(new
                {
                    CustomerId = customer.Id,
                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new {SeName = customer.GetSeName(0)}),

                });
            }

            return Json(models);

        }


        [HttpPost]
        public ActionResult GetInvited(int eventPageId)
        {

            var invited = _eventPageAttendanceService.GetAllInvited(eventPageId);


            if (invited.Count == 0)
                return Json(null);

            var invitedCustomers = _customerService.GetCustomersByIds(invited.Select(x => x.CustomerId).ToArray());

            var models = new List<object>();

            foreach (var customer in invitedCustomers)
            {
                models.Add(new
                {
                    CustomerId = customer.Id,
                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new {SeName = customer.GetSeName(0)}),

                });
            }

            return Json(models);

        }



        [HttpPost]
        public ActionResult InviteFriends(int eventPageId, int[] customerIds)
        {

            if (_workContext.CurrentCustomer.IsGuest())
                return Json(new {redirect = Url.RouteUrl("Login")}, JsonRequestBehavior.AllowGet);


            var invitedCustomers = _eventPageAttendanceService.InviteFriends(eventPageId, customerIds);

            var models = new List<object>();

            foreach (var customer in invitedCustomers)
            {
                models.Add(new
                {
                    CustomerId = customer.Id,
                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new {SeName = customer.GetSeName(0)}),

                });
            }

            return Json(models);
        }

        [HttpPost]
        public ActionResult GetUninvitedFriends(int eventPageId, int index)
        {
            var customerId = _workContext.CurrentCustomer.Id;

            var uninvitedFriends = _eventPageAttendanceService.GetUninvitedFriends(eventPageId, customerId,
                index, 20);


            if (uninvitedFriends.Count == 0)
                return Json(null);

            var uninvitedFriendsAsCustomers = _customerService.GetCustomersByIds(
                uninvitedFriends.Select(x => (x.ToCustomerId == customerId)
                    ? x.FromCustomerId
                    : x.ToCustomerId)
                    .ToArray());

            var models = new List<object>();

            foreach (var customer in uninvitedFriendsAsCustomers)
            {
                models.Add(new
                {
                    CustomerId = customer.Id,
                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new {SeName = customer.GetSeName(0)}),

                });
            }

            return Json(models);

        }


        //todo: clean up unused methods

        [HttpPost]
        public ActionResult GetAttendance(int start, int count, int attendanceStatusId)
        {

            if (Enum.IsDefined(typeof (AttendanceStatus), attendanceStatusId))
                return Json(null);


            var attendances = new List<EventPageAttendance>();
            var attendanceStatusName = string.Empty;


            switch (attendanceStatusId)
            {
                case (int) AttendanceStatus.Invited:
                    attendanceStatusName = AttendanceStatus.Invited.ToString();
                    attendances = _eventPageAttendanceService.GetInvited(start, count);
                    break;
                case (int) AttendanceStatus.Going:
                    attendanceStatusName = AttendanceStatus.Going.ToString();
                    attendances = _eventPageAttendanceService.GetGoing(start, count);
                    break;
                case (int) AttendanceStatus.Maybe:
                    attendanceStatusName = AttendanceStatus.Maybe.ToString();
                    attendances = _eventPageAttendanceService.GetMaybies(start, count);
                    break;
                case (int) AttendanceStatus.NotGoing:
                    attendanceStatusName = AttendanceStatus.NotGoing.ToString();
                    attendances = _eventPageAttendanceService.GetNotGoing(start, count);
                    break;
            }

            var customerIds = attendances.Select(x => x.CustomerId).ToArray();
            var customers = _customerService.GetCustomersByIds(customerIds);

            var models = new List<object>();

            foreach (var customer in customers)
            {
                models.Add(new
                {

                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new {SeName = customer.GetSeName(0)}),

                });
            }

            return Json(new
            {

                AttendanceStatusName = attendanceStatusName,
                Customers = models
            });
        }


        [HttpPost]
        public ActionResult GetCustomerAttendanceStatus(int eventPageId)
        {

            var customerId = _workContext.CurrentCustomer.Id;

            var customerAttendanceStatus =
                _eventPageAttendanceService.GetCustomerAttendanceStatus(customerId, eventPageId);

            var attendanceStatusId = (customerAttendanceStatus == null)
                ? (int) AttendanceStatus.None
                : (int) customerAttendanceStatus.AttendanceStatusId;

            return Json(new
            {
                CustomerId = customerId,
                EventPageId = eventPageId,
                AttendanceStatusId = attendanceStatusId
            });

        }


        [HttpPost]
        public ActionResult UpdateAttendanceStatus(int eventPageId, int attendanceStatusId)
        {
            if (_workContext.CurrentCustomer.IsGuest())
                return Json(new {redirect = Url.RouteUrl("Login")}, JsonRequestBehavior.AllowGet);



            try
            {
                if (!Enum.IsDefined(typeof (AttendanceStatus), attendanceStatusId))
                    throw new ApplicationException("Invalid attendance status.");


                var customerId = _workContext.CurrentCustomer.Id;
                var customerAttendanceStatus =
                    _eventPageAttendanceService.GetCustomerAttendanceStatus(eventPageId, customerId);
                var previousAttendanceStatusId = attendanceStatusId;

                if (customerAttendanceStatus == null) // new attendance
                {
                    customerAttendanceStatus = new EventPageAttendance()
                    {
                        EventPageId = eventPageId,
                        CustomerId = customerId,
                        AttendanceStatusId = attendanceStatusId,
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now
                    };
                    _eventPageAttendanceService.Insert(customerAttendanceStatus);
                }
                else // update existing attendance
                {
                    previousAttendanceStatusId = customerAttendanceStatus.AttendanceStatusId;
                    customerAttendanceStatus.AttendanceStatusId = attendanceStatusId;
                    customerAttendanceStatus.DateUpdated = DateTime.Now;
                    _eventPageAttendanceService.Update(customerAttendanceStatus);
                }

                return Json(new
                {
                    PreviousAttendanceStatusId = previousAttendanceStatusId,
                    EventPageAttendanceId = customerAttendanceStatus.Id,
                    EventPageId = eventPageId,
                    CustomerId = customerId,
                    AttendanceStatusId = attendanceStatusId,
                    FullName = _workContext.CurrentCustomer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                        _workContext.CurrentCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled,
                        defaultPictureType: PictureType.Avatar),
                    ProfileUrl =
                        Url.RouteUrl("CustomerProfileUrl", new {SeName = _workContext.CurrentCustomer.GetSeName(0)}),
                });

            }
            catch
            {
                return Json(false);
            }
        }


        public ActionResult BusinessPageSearchAutoComplete(string term)
        {
            if (String.IsNullOrWhiteSpace(term) || term.Length < _mobSocialSettings.EventPageSearchTermMinimumLength)
                return Json(new object());

            var items = _businessPageService.GetAll(term, _mobSocialSettings.EventPageSearchAutoCompleteNumberOfResults);

            var models = new List<object>();
            foreach (var item in items)
            {
                var picture = _businessPageService.GetFirstPicture(item.Id);
                var state = _stateProvinceService.GetStateProvinceById(item.StateProvinceId);
                var stateName = (state != null) ? state.Name : string.Empty;

                models.Add(new
                {
                    DisplayName = item.Name,
                    Url = Url.RouteUrl("BusinessPageUrl", new {SeName = item.GetSeName()}),
                    PictureUrl = _pictureService.GetPictureUrl(picture, 50, true),
                    Subtitle = item.Address1 + " " + item.City + ", " + state.Name,
                });

            }

            return Json(models, JsonRequestBehavior.AllowGet);
        }




        public ActionResult AddPicture(int entityId, string entityName)
        {

            if (!_customerSettings.AllowViewingProfiles)
            {
                return RedirectToRoute("HomePage");
            }


            var addPictureModel = new AddPictureModel()
            {
                EntityId = entityId,
                EntityName = entityName,
                DisplayOrder = 1
            };

            return View(ControllerUtil.MobSocialViewsFolder + "/BusinessPage/AddPicture.cshtml", addPictureModel);
        }


        [HttpPost]
        public void UploadFile(int entityId, string entityName, IEnumerable<HttpPostedFileBase> file)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.UploadPictures))
            //    return Json(new { success = false, error = "You do not have required permissions" }, "text/plain");
            var files = file.ToList();
            foreach (var fi in files)
            {
                //we process it distinct ways based on a browser
                //find more info here http://stackoverflow.com/questions/4884920/mvc3-valums-ajax-file-upload
                Stream stream = null;
                var fileName = "";
                var contentType = "";

                if (file == null)
                    throw new ArgumentException("No file uploaded");

                stream = fi.InputStream;
                fileName = Path.GetFileName(fi.FileName);
                contentType = fi.ContentType;

                var fileBinary = new byte[stream.Length];
                stream.Read(fileBinary, 0, fileBinary.Length);

                var fileExtension = Path.GetExtension(fileName);
                if (!String.IsNullOrEmpty(fileExtension))
                    fileExtension = fileExtension.ToLowerInvariant();

                
                if (String.IsNullOrEmpty(contentType))
                {
                    contentType = PictureUtility.GetContentType(fileExtension);
                }

                var picture = _pictureService.InsertPicture(fileBinary, contentType, null, true);


                var firstBusinessPagePicture = _businessPageService.GetFirstEntityPicture(entityId);

                if (firstBusinessPagePicture == null)
                {
                    var businessPagePicture = new BusinessPagePicture()
                    {
                        BusinessPageId = entityId,
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        DisplayOrder = 1,
                        PictureId = picture.Id
                    };
                    _businessPageService.InsertPicture(businessPagePicture);
                }
                else
                {
                    firstBusinessPagePicture.BusinessPageId = entityId;
                    firstBusinessPagePicture.DateCreated = DateTime.Now;
                    firstBusinessPagePicture.DateUpdated = DateTime.Now;
                    firstBusinessPagePicture.DisplayOrder = 1;
                    firstBusinessPagePicture.PictureId = picture.Id;
                    _businessPageService.UpdatePicture(firstBusinessPagePicture);
                }

            }

        }


        [HttpGet]
        public ActionResult Search()
        {

            

            var states = _stateProvinceService.GetStateProvincesByCountryId(1).ToList();

            var model = new BusinessPageSearchModel();

            model.AvailableStates.Add(new SelectListItem
            {
                Text = _localizationService.GetResource("Admin.Address.SelectState"),
                Value = "0"
            });

            foreach (var state in states)
            {
                model.AvailableStates.Add(new SelectListItem
                {
                    Text = state.Name,
                    Value = state.Id.ToString(),
                    Selected = (state.Id == model.StateProvinceId)
                });
            }


            var countries = _countryService.GetAllCountries();

            model.AvailableCountries.Add(new SelectListItem
            {
                Text = _localizationService.GetResource("Admin.Address.SelectCountry"),
                Value = "0"
            });

            foreach (var country in countries)
            {
                model.AvailableCountries.Add(new SelectListItem
                {
                    Text = country.Name,
                    Value = country.Id.ToString(),
                    Selected = (country.Id == model.StateProvinceId)
                });
            }



            return View(ControllerUtil.MobSocialViewsFolder + "/BusinessPage/Search.cshtml", model); 

            
        }


        [HttpPost]
        public ActionResult GetAllCountries()
        {

            var countries = _countryService.GetAllCountries().ToList();
            var model = new List<object>();
            countries.ForEach(x => model.Add(new { Id = x.Id, Name = x.Name }));
 
            return Json(model);
        }


        [HttpPost]
        public ActionResult GetStateProvinces(int countryId)
        {
            var states = _stateProvinceService.GetStateProvincesByCountryId(countryId).ToList();
            var model = new List<object>();
            states.ForEach(x => model.Add(new { Id = x.Id, Name = x.Name }));
            return Json(model);
        }




        [HttpPost]
        public ActionResult Search(string nameKeyword, string city, int? stateProvinceId, int? countryId)
        {
            var businessResults = _businessPageService.Search(nameKeyword, city, stateProvinceId, countryId);

            var results = new List<object>();
            foreach (var item in businessResults)
            {

                var state = _stateProvinceService.GetStateProvinceById(item.StateProvinceId);
                var stateAbbreviation = (state != null) ? state.Abbreviation : string.Empty;

                var picture = _businessPageService.GetFirstPicture(item.Id);

                results.Add(new
                {
                    Title = item.Name,
                    Subtitle = item.Address1 + " " + item.City + ", " + stateAbbreviation,
                    Url = Url.RouteUrl("BusinessPageUrl", new {SeName = item.GetSeName()}),
                    ThumbnailUrl = _pictureService.GetPictureUrl(picture, 75)
                });
            }

            return Json(results);
        }


    }
}
