using Nop.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class SongPicture : BaseEntity
    {
        public int SongId { get; set; }
        public int PictureId { get; set; }
        public int DisplayOrder { get; set; }

        public virtual Song Song { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
