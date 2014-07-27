using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class EventPageModel : BaseNopEntityModel
    {

        public EventPageModel()
        {
            AddHotelModel = new EventPageHotelModel();
            AddPictureModel = new EventPageAddPictureModel();
            Pictures = new List<EventPagePictureModel>();
            Hotels = new List<EventPageHotelModel>();

        }

        public string Name { get; set; }
        public string LocationName { get; set; }
        public string LocationAddress1 { get; set; }
        public string LocationAddress2 { get; set; }
        public string LocationState { get; set; }
        public string LocationCity { get; set; }
        public string LocationZipPostalCode { get; set; }
        public string LocationCountry { get; set; }
        public string LocationPhone { get; set; }
        public string LocationWebsite { get; set; }
        public string LocationEmail { get; set; }
        public DateTime StartDate { get; set; }
        [UIHint("DateTimeNullable")]
        public DateTime? EndDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public string SeName { get; set; }


        public List<EventPageHotelModel> Hotels { get; set; }

        public List<EventPagePictureModel> Pictures { get; set; }

        public EventPageAddPictureModel AddPictureModel { get; set; }

        public EventPageHotelModel AddHotelModel { get; set; }


        public class EventPageAddPictureModel : BaseNopModel
        {
            [UIHint("Picture")]
            public int PictureId { get; set; }

            //[NopResourceDisplayName("Admin.Catalog.Products.Pictures.Fields.Picture")]
            public string PictureUrl { get; set; }

            //[NopResourceDisplayName("Admin.Catalog.Products.Pictures.Fields.DisplayOrder")]
            public int DisplayOrder { get; set; }

        }



    }
}