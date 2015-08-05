using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VideoGenreMap: EntityTypeConfiguration<VideoGenre>
    {
        public VideoGenreMap()
        {
            ToTable("VideoGenre");
            Property(x => x.GenreName);
        }
    }
}
