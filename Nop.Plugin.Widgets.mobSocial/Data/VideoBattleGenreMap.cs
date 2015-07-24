using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VideoBattleGenreMap : EntityTypeConfiguration<VideoBattleGenre>
    {
        public VideoBattleGenreMap()
        {
            ToTable("VideoBattleGenre");
            HasKey(x => x.Id);
            Property(x => x.VideoBattleId);
            Property(x => x.VideoGenreId);
        }
    }
}
