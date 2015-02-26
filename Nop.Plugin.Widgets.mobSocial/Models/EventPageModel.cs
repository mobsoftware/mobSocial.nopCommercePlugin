using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using Nop.Web.Framework.Localization;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class EventPageModel : BasePageModel
    {
        public EventPageModel()
        {
            AddHotelModel = new EventPageHotelModel();
            Hotels = new List<EventPageHotelModel>();
        }

        public List<EventPageHotelModel> Hotels { get; set; }
        public EventPageHotelModel AddHotelModel { get; set; }
        public string LocationName { get; set; }
        public string LocationState { get; set; }
        public string LocationCountry { get; set; }
        public string LocationCity { get; set; }
        public string LocationAddress1 { get; set; }
        public string LocationAddress2 { get; set; }
    }

   
}