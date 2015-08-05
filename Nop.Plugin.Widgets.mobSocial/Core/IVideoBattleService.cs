using System.Collections;
using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface IVideoBattleService : IBaseService<VideoBattle, VideoBattlePicture>
    {
        IList<VideoBattle> GetAll(int? ChallengerId, int? ParticipantId, int? VideoGenreId, VideoBattleStatus? BattleStatus, int Page = 1, int Count = 15);
    }
}