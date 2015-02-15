using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using Nop.Web.Framework.Localization;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class BusinessPageCouponModel 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipPostalCode { get; set; }
        public string PhoneNumber { get; set; }
        [AllowHtml]
        public string AdditionalInformation { get; set; }
        public string Country { get; set; }
        public int DisplayOrder { get; set; }
        public int BusinessPageId { get; set; }
        public string Disclaimer { get; set; }
    }

}