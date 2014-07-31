using System;
using System.Collections.Generic;
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
using Nop.Plugin.Widgets.MobSocial.Models;
using System.Linq;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class EventPageController : BasePublicController
    {
        private readonly IForumService _forumService;
        private readonly ILocalizationService _localizationService;
        private readonly IPictureService _pictureService;
        private readonly ICountryService _countryService;
        private readonly ICustomerService _customerService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly ForumSettings _forumSettings;
        private readonly CustomerSettings _customerSettings;
        private readonly MediaSettings _mediaSettings;
        private readonly BaseService<EventPage, EventPagePicture> _eventPageService;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly EventPageAttendanceService _eventPageAttendanceService;
        private readonly IWorkContext _workContext;

        public EventPageController(IForumService forumService, ILocalizationService localizationService,
            IPictureService pictureService, ICountryService countryService,
            ICustomerService customerService, IDateTimeHelper dateTimeHelper,
            ForumSettings forumSettings, CustomerSettings customerSettings,
            MediaSettings mediaSettings, BaseService<EventPage, EventPagePicture> eventPageService,
            mobSocialSettings mobSocialSettings, EventPageAttendanceService eventPageAttendanceService,
            IWorkContext workContext)
        {
            _forumService = forumService;
            _localizationService = localizationService;
            _pictureService = pictureService;
            _countryService = countryService;
            _customerService = customerService;
            _dateTimeHelper = dateTimeHelper;
            _forumSettings = forumSettings;
            _customerSettings = customerSettings;
            _mediaSettings = mediaSettings;
            _eventPageService = eventPageService;
            _eventPageAttendanceService = eventPageAttendanceService;
            _mobSocialSettings = mobSocialSettings;
            _workContext = workContext;
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

            var entity = _eventPageService.GetById(entityId);
            if (entity == null)
            {
                return RedirectToRoute("HomePage");
            }

            var model = new EventPageModel()
            {
                Id = entity.Id,
                Name = entity.Name,
                LocationName = entity.LocationName,
                LocationAddress1 = entity.LocationAddress1,
                LocationAddress2 = entity.LocationAddress2,
                LocationCity = entity.LocationCity,
                LocationState = entity.LocationState,
                LocationZipPostalCode = entity.LocationZipPostalCode,
                LocationCountry = entity.LocationCountry,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Description = entity.Description,
                DateCreated = entity.DateCreated,
                DateUpdated = entity.DateUpdated,
            };

            // Event Page Hotels
            foreach(var hotel in entity.Hotels)
            {
                model.Hotels.Add(new EventPageHotelModel
                {
                    Id = hotel.Id,
                    Name = hotel.Name,
                    Title = hotel.Title,
                    Address1 = hotel.Address1,
                    Address2 = hotel.Address2,
                    City = hotel.City,
                    State = hotel.State,
                    ZipPostalCode = hotel.ZipPostalCode,
                    Country = hotel.Country,
                    PhoneNumber = hotel.PhoneNumber,
                    AdditionalInformation = hotel.AdditionalInformation
                });                                          
            }

            // Event Page Pictures
            foreach(var picture in entity.Pictures)
            {
                model.Pictures.Add(new EventPagePictureModel
                {
                    Id = picture.Id,
                    EventPageId = entity.Id,
                    PictureId = picture.PictureId,
                    DisplayOrder = picture.DisplayOrder,
                    DateCreated = picture.DateCreated,
                    DateUpdated = picture.DateUpdated,
                    PictureUrl = _pictureService.GetPictureUrl(picture.PictureId, 200)
                });  
            }


            if(entity.Pictures.Count > 0)
                model.MainPictureUrl = model.Pictures.First().PictureUrl;
            else
                model.MainPictureUrl = _pictureService.GetDefaultPictureUrl(200);

            

            return View(model);
        }

        [HttpPost]
        public ActionResult GetAllAttendances(int eventPageId)
        {

            var attendances = _eventPageAttendanceService.GetAllAttendances(eventPageId);
            var attendanceTypes = attendances.GroupBy(x=>x.AttendanceStatusId).ToList();

            var attendanceTypeModels = new List<object>();

            foreach (var attendanceType in attendanceTypes)
            {
                var attendanceTypeStatus = (AttendanceStatus)attendanceType.First().AttendanceStatusId;

                var attendanceTypeCustomersIds = attendanceType.ToList().Select(x => x.CustomerId).ToArray();
                var attendanceTypeCustomers = _customerService.GetCustomersByIds(attendanceTypeCustomersIds);


                var attendanceCustomerModels = new List<object>();

                foreach (var customer in attendanceTypeCustomers)
                {
                    attendanceCustomerModels.Add(new
                    {
                        FullName = customer.GetFullName(),
                        PictureUrl = _pictureService.GetPictureUrl(
                                customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                                _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

                    });
                }


                var attendanceTypeModel = new
                {
                    AttendanceStatusName = attendanceTypeStatus.ToString(),
                    Customers = attendanceCustomerModels
                };


                attendanceTypeModels.Add(attendanceTypeModel);


            }

            return Json(attendanceTypeModels);
        }

        [HttpPost]
        public ActionResult GetAttendance(int start, int count, int attendanceStatusId)
        {

            if (Enum.IsDefined(typeof(AttendanceStatus), attendanceStatusId))
                return Json(null);


            var attendances = new List<EventPageAttendance>();
            var attendanceStatusName = string.Empty;


            switch (attendanceStatusId)
            {
                case (int)AttendanceStatus.Invited:
                    attendanceStatusName = AttendanceStatus.Invited.ToString();
                    attendances = _eventPageAttendanceService.GetInvited(start, count);
                    break;
                case (int)AttendanceStatus.Going:
                    attendanceStatusName = AttendanceStatus.Going.ToString();
                    attendances = _eventPageAttendanceService.GetGoing(start, count);
                    break;
                case (int)AttendanceStatus.Maybe:
                    attendanceStatusName = AttendanceStatus.Maybe.ToString();
                    attendances = _eventPageAttendanceService.GetMaybies(start, count);
                    break;
                case (int)AttendanceStatus.NotGoing:
                    attendanceStatusName = AttendanceStatus.NotGoing.ToString();
                    attendances = _eventPageAttendanceService.GetNotGoing(start, count);
                    break;
            }

            var customerIds = attendances.Select(x => x.CustomerId).ToArray();
            var customers = _customerService.GetCustomersByIds(customerIds);

            var models = new List<object>();

            foreach(var customer in customers)
            {
                models.Add(new
                {
                    
                    FullName = customer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                            customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                            _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

                });
            }

            return Json(new { 
                AttendanceStatusName = attendanceStatusName,
                Customers = models 
            });
        }


        [HttpPost]
        public ActionResult GetCustomerAttendanceStatus(int eventPageId)
        {

            var customerId = _workContext.CurrentCustomer.Id;

            var customerAttendanceStatus =
                _eventPageAttendanceService.GetCustomerAttendanceStatus(eventPageId, customerId);

            var attendanceStatusId = (customerAttendanceStatus == null) 
                ? (int)AttendanceStatus.None : (int)customerAttendanceStatus.AttendanceStatusId;

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

            try
            {
                if (!Enum.IsDefined(typeof(AttendanceStatus), attendanceStatusId))
                    throw new ApplicationException("Invalid attendance status.");


                var customerId = _workContext.CurrentCustomer.Id;
                var customerAttendanceStatus =
                      _eventPageAttendanceService.GetCustomerAttendanceStatus(eventPageId, customerId);


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
                    customerAttendanceStatus.AttendanceStatusId = attendanceStatusId;
                    customerAttendanceStatus.DateUpdated = DateTime.Now;
                    _eventPageAttendanceService.Update(customerAttendanceStatus);
                }

                return Json(new {
                    EventPageAttendanceId = customerAttendanceStatus.Id,
                    EventPageId = eventPageId,
                    CustomerId = customerId,
                    AttendanceStatusId = attendanceStatusId,
                    FullName = _workContext.CurrentCustomer.GetFullName(),
                    PictureUrl = _pictureService.GetPictureUrl(
                            _workContext.CurrentCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                            _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = _workContext.CurrentCustomer.GetSeName(0) }),
                });

            }
            catch
            {
                return Json(false);
            }
        }

       
        public ActionResult EventPageSearchAutoComplete(string term)
        {
            if (String.IsNullOrWhiteSpace(term) || term.Length < _mobSocialSettings.EventPageSearchTermMinimumLength)
                return Json(new object());

            var items = _eventPageService.GetAll(term, _mobSocialSettings.EventPageSearchAutoCompleteNumberOfResults);


            var models = new List<object>();

            foreach (var item in items)
            {
                var entityPicture = _eventPageService.GetFirstPicture(item.Id);
                var defaultPicture = (entityPicture != null) ? _pictureService.GetPictureById(entityPicture.PictureId) : null;

                models.Add(new
                {

                    DisplayName = item.Name,
                    Url = Url.RouteUrl("EventPageUrl", new { SeName = item.GetSeName() }),
                    PictureUrl = _pictureService.GetPictureUrl(defaultPicture, 50, true),
                    //TODO: Add EventStartsFormat as locale resource string 
                    EventStartsText = "Starts " + item.StartDate.ToString("MMMM d, yyyy") + " at " + item.StartDate.ToString("hh:mmtt"),
                });


            }

            return Json(models, JsonRequestBehavior.AllowGet);
        }


    }
}
