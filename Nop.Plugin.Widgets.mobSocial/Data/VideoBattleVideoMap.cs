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
    public class VideoBattleVideoMap: BaseMobEntityTypeConfiguration<VideoBattleVideo>
    {
        public VideoBattleVideoMap()
        {
            Property(x => x.ParticipantId);
            Property(x => x.VideoBattleId);
            Property(x => x.VideoPath);
            Property(x => x.MimeType);
            Property(x => x.VideoStatus);
            Property(x => x.DateUploaded).HasColumnType("datetime2");
        }
    }
}
