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
    public class VideoBattleVoteMap : BaseMobEntityTypeConfiguration<VideoBattleVote>
    {
        public VideoBattleVoteMap()
        {
            Property(x => x.ParticipantId);
            Property(x => x.UserId);
            Property(x => x.VideoBattleId);
            Property(x => x.VoteValue);
            Property(x => x.VoteStatus);

        }
    }
}
