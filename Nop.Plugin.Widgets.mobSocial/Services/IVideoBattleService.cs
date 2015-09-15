using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattleService : IBaseService<VideoBattle, VideoBattlePicture>
    {
        IList<VideoBattle> GetAll(int? ChallengerId, int? ParticipantId, int? VideoGenreId, VideoBattleStatus? BattleStatus, VideoBattleType? BattleType, out int TotalPages, int Page = 1, int Count = 15);

        void SetScheduledBattlesOpenOrClosed();
    }
}