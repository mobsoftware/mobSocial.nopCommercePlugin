using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class ArtistPageMap : EntityTypeConfiguration<ArtistPage>
    {
        public ArtistPageMap()
        {
            ToTable(typeof(ArtistPage).Name);

            HasKey(m => m.Id);

            Property(m => m.Name);
            Property(m => m.RemoteEntityId);
            Property(m => m.RemoteSourceName);
            Property(m => m.Biography);
            Property(m => m.DateOfBirth).HasColumnType("datetime2");
            Property(m => m.Gender);
            Property(m => m.HomeTown);
            Property(m => m.ShortDescription);

        }
    }
}
