using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattleVideoService: IBaseService<VideoBattleVideo, VideoBattleVideo>
    {
        VideoBattleVideo GetBattleVideo(int BattleId, int ParticipantId);

        IList<VideoBattleVideo> GetBattleVideos(int BattleId);
    }
}