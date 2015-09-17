using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattleVoteService: IBaseService<VideoBattleVote, VideoBattleVote>
    {
        IList<VideoBattleVote> GetVideoBattleVotes(int VideoBattleId, int? UserId);
    }
}