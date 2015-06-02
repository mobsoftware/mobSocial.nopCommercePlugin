using Nop.Core;
using Nop.Core.Domain.Media;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class ArtistPagePicture : BaseEntity
    {
        public int ArtistPageId { get; set; }
        public int PictureId { get; set; }
        public int DisplayOrder { get; set; }

        public virtual ArtistPage Artist { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

    }
}
