using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Data;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    class SongMap : BaseMobEntityTypeConfiguration<Song>
    {
        public SongMap()
        {

            Property(x => x.Name);
            Property(x => x.PageOwnerId);
            Property(x => x.PreviewUrl);
            Property(x => x.TrackId);
            Property(x => x.RemoteEntityId);
            Property(x => x.RemoteSourceName);
            Property(x => x.ArtistPageId);
            Property(x => x.AssociatedProductId);
            Property(x => x.Published);
        }
    }
}
