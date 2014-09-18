using Nop.Web.Framework.Mvc;
using System;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerProfileModel : BaseNopModel
    {
        public int CustomerId { get; set; }
        public string AboutMe { get; set; }
        public bool IsLoggedInUsersProfile { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}