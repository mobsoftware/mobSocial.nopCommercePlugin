using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattleVideoService: IBaseEntityService<VideoBattleVideo>
    {
        VideoBattleVideo GetBattleVideo(int BattleId, int ParticipantId);

        IList<VideoBattleVideo> GetBattleVideos(int BattleId);
    }
}