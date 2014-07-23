using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.mobSocial.Models
{
    public class EventPagePictureModel
    {
        public int Id { get; set; }

        public int PictureId { get; set; }

        public int DisplayOrder { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }
    }
}
