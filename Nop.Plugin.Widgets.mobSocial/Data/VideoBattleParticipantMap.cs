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
    public class VideoBattleParticipantMap : BaseMobEntityTypeConfiguration<VideoBattleParticipant>
    {
        public VideoBattleParticipantMap()
        {
            Property(x => x.ParticipantId);
            Property(x => x.VideoBattleId);
            Property(x => x.ParticipantStatus);
            Property(x => x.LastUpdated).HasColumnType("datetime2");
            Property(x => x.Remarks);
        }
    }
}
