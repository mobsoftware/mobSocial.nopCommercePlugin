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
    public class ArtistPageMap : BaseMobEntityTypeConfiguration<ArtistPage>
    {
        public ArtistPageMap()
        {
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
