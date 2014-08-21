using Mob.Core;
using Nop.Core;
using Nop.Core.Domain.Seo;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class EventPage : BaseEntity, ISlugSupported, INameSupported
    {

        public string Name { get; set; }
        public string LocationName { get; set; }
        public string LocationAddress1 { get; set; }
        public string LocationAddress2 { get; set; }
        public string LocationCity { get; set; }
        public string LocationState { get; set; }
        public string LocationZipPostalCode { get; set; }
        public string LocationCountry { get; set; }
        public string LocationPhone { get; set; }
        public string LocationWebsite { get; set; }
        public string LocationEmail { get; set; }
        public string Description { get; set; }


        public string SeName { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public virtual List<EventPageHotel> Hotels { get; set; }
        public virtual List<EventPagePicture> Pictures { get; set; }



    }
}