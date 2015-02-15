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
        private readonly IEventPageService _eventPageService;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly IEventPageAttendanceService _eventPageAttendanceService;
        private readonly IWorkContext _workContext;
        private readonly IMobSocialService _mobSocialService;

        public EventPageController(IForumService forumService, ILocalizationService localizationService,
            IPictureService pictureService, ICountryService countryService,
            ICustomerService customerService, IDateTimeHelper dateTimeHelper,
            ForumSettings forumSettings, CustomerSettings customerSettings,
            MediaSettings mediaSettings, IEventPageService eventPageService,
            mobSocialSettings mobSocialSettings, IEventPageAttendanceService eventPageAttendanceService,
            IMobSocialService mobSocialService, IWorkContext workContext)
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
            _mobSocialService = mobSocialService;
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
                LocationPhone = entity.LocationPhone,
                LocationEmail = entity.LocationEmail,
                LocationWebsite = entity.LocationWebsite,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Description = entity.Description,
                MetaKeywords = entity.MetaKeywords,
                MetaDescription = entity.MetaDescription,
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

            return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/EventPage/Index.cshtml", model);
        }
        
        [HttpPost]
        public ActionResult GetGoing(int eventPageId)
        {

            var going = _eventPageAttendanceService.GetAllGoing(eventPageId);


            if(going.Count == 0)
                return Json(null);

            var goingCustomers = _customerService.GetCustomersByIds(going.Select(x=>x.CustomerId).ToArray());

            var models = new List<object>();

            foreach(var customer in goingCustomers)
            {
                 models.Add(new
                    {
                        CustomerId = customer.Id,
                        FullName = customer.GetFullName(),
                        PictureUrl = _pictureService.GetPictureUrl(
                                customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                                _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

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
                            _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

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
                            _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

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
                            _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

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
                            _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

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
                            _mobSocialSettings.EventPageAttendanceThumbnailSize, _customerSettings.DefaultAvatarEnabled, defaultPictureType: PictureType.Avatar),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),

                });
            }

            return Json(models);

        }


        //todo: clean up unused methods

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
                _eventPageAttendanceService.GetCustomerAttendanceStatus(customerId, eventPageId);

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
            if (_workContext.CurrentCustomer.IsGuest())
                return Json(new { redirect = Url.RouteUrl("Login") }, JsonRequestBehavior.AllowGet);

                

            try
            {
                if (!Enum.IsDefined(typeof(AttendanceStatus), attendanceStatusId))
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

                return Json(new {
                    PreviousAttendanceStatusId = previousAttendanceStatusId,
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
