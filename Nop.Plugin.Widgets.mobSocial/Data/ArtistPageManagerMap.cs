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
    public class ArtistPageManagerMap : BaseMobEntityTypeConfiguration<ArtistPageManager>
    {
        public ArtistPageManagerMap()
        {

            Property(m => m.ArtistPageId);
            Property(m => m.CustomerId);

        }
    }
}
