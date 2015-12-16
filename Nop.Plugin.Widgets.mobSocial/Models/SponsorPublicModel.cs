using System.Collections.Generic;
using Nop.Admin.Models.Orders;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SponsorPublicModel : BaseNopModel
    {
       
        public string SponsorName { get; set; }

        public string SeName { get; set; }

        public int CustomerId { get; set; }

        public string SponsorProfileImageUrl { get; set; }

        public SponsorshipStatus SponsorshipStatus { get; set; }

        public string SponsorshipStatusName { get; set; }

        public decimal SponsorshipAmount { get; set; }

        public string SponsorshipAmountFormatted { get; set; }

        public SponsorDataModel SponsorData { get; set; }
    }
}