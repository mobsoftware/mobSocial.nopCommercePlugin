using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    /// <summary>
    /// Reusable generic Picture Model class
    /// </summary>
    public class PictureModel
    {

        public int Id { get; set; }
        [UIHint("Picture")]
        public int PictureId { get; set; }
        public int DisplayOrder { get; set; }
        /// <summary>
        /// Id to entity which this picture belongs (e.g. event page, business page, profile, etc)
        /// </summary>
        public int EntityId { get; set; } 
        public string PictureUrl { get; set; }
        public string FullSizeImageUrl { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

    }
}
