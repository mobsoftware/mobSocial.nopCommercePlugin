using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattleVoteService: IBaseEntityService<VideoBattleVote>
    {
        IList<VideoBattleVote> GetVideoBattleVotes(int VideoBattleId, int? UserId);
    }
}