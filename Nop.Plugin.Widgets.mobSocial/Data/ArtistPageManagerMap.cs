using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class ArtistPageManagerMap : EntityTypeConfiguration<ArtistPageManager>
    {
        public ArtistPageManagerMap()
        {
            ToTable(typeof(ArtistPageManager).Name);

            HasKey(m => m.Id);

            Property(m => m.ArtistPageId);
            Property(m => m.CustomerId);

        }
    }
}
