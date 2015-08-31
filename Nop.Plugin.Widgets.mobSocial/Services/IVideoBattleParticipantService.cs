using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattleParticipantService: IBaseService<VideoBattleParticipant, VideoBattleParticipant>
    {
        VideoBattleParticipant GetVideoBattleParticipant(int BattleId, int ParticipantId);

        VideoBattleParticipantStatus GetParticipationStatus(int BattleId, int ParticipantId);

        IList<VideoBattleParticipant> GetVideoBattleParticipants(int BattleId, VideoBattleParticipantStatus? ParticipantStatus);
    }
}