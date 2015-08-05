using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VideoBattleParticipantMap : EntityTypeConfiguration<VideoBattleParticipant>
    {
        public VideoBattleParticipantMap()
        {
            ToTable("VideoBattleParticipant");
            HasKey(x => x.Id);
            Property(x => x.ParticipantId);
            Property(x => x.VideoBattleId);
            Property(x => x.ParticipantStatus);
        }
    }
}
