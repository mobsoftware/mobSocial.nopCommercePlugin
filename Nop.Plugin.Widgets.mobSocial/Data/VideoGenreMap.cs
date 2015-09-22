using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VideoGenreMap: BaseMobEntityTypeConfiguration<VideoGenre>
    {
        public VideoGenreMap()
        {
            Property(x => x.GenreName);
        }
    }
}
