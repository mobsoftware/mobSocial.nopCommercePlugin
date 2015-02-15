using Nop.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class BusinessPagePicture : BaseEntity
    {
        public int BusinessPageId { get; set; }
        public int PictureId { get; set; }
        public int DisplayOrder { get; set; }

        public virtual BusinessPage BusinessPage { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
