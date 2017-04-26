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
using Nop.Web.Framework.Security;
using Nop.Plugin.WebApi.MobSocial.Domain;
using Nop.Web.Controllers;
using System.Linq;
using mobSocial.Data.Entity.EventPages;
using mobSocial.Data.Enum;
using Nop.Core;
using Nop.Plugin.WebApi.MobSocial;
using Nop.Plugin.WebApi.MobSocial.Enums;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Plugin.WebApi.MobSocial.Models;
using Nop.Web.Models.Media;
using SeoExtensions = Nop.Plugin.WebApi.MobSocial.Extensions.SeoExtensions;
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
                ZipPostalCode = entity.LocationZipPostalCode,
                LocationCountry = entity.LocationCountry,
                Phone = entity.LocationPhone,
                Email = entity.LocationEmail,
                Website = entity.LocationWebsite,
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

            return View("mobSocial/EventPage/Index", model);
        }
        
    


  




    }
}
