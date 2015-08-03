using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class VideoBattlePicture : BaseEntity
    {
        public int VideoBattleId { get; set; }
        public int PictureId { get; set; }
        public int DisplayOrder { get; set; }

        public virtual VideoBattle VideoBattle { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
