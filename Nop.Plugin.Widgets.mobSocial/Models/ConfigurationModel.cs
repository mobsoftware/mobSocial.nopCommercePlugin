using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class ConfigurationModel : BaseNopModel
    {
        public ConfigurationModel()
        {
            AvailableZones = new List<SelectListItem>();
        }

       

        [NopResourceDisplayName("Admin.ContentManagement.Widgets.ChooseZone")]
        public string ZoneId { get; set; }

        public IList<SelectListItem> AvailableZones { get; set; }

        public string Product2Name { get; set; }

        public int DisplayOrder { get; set; }

        public int Id { get; set; }

    }
}