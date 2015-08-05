using Nop.Plugin.Widgets.MobSocial.Domain;
using System.Collections.Generic;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface IVideoBattleVoteService: IBaseService<VideoBattleVote, VideoBattleVote>
    {
        IList<VideoBattleVote> GetVideoBattleVotes(int VideoBattleId, int? UserId);
    }
}