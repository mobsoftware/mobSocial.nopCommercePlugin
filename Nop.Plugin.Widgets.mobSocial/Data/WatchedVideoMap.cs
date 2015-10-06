using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class WatchedVideoMap : BaseMobEntityTypeConfiguration<WatchedVideo>
    {
        public WatchedVideoMap()
        {
            Property(x => x.CustomerId);
            Property(x => x.VideoId);
            Property(x => x.VideoType);
        }
    }
}
