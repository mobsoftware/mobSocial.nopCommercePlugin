using Mob.Core;
using Nop.Core;
using Nop.Core.Domain.Seo;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class Song : BaseEntity, ISlugSupported, INameSupported
    {
        public int PageOwnerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string RemoteEntityId { get; set; }
        public string RemoteSourceName { get; set; }
        public string PreviewUrl { get; set; }
        public string TrackId { get; set; }
        public string RemoteArtistId { get; set; }
        
        public virtual IList<SongPicture> Pictures { get; set; }
    }
}
