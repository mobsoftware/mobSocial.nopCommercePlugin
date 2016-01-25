using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattleService : IBaseEntityWithPictureService<VideoBattle, VideoBattlePicture>
    {
        IList<VideoBattle> GetAll(int? ChallengerId, int? ParticipantId, int? VideoGenreId, VideoBattleStatus? BattleStatus, VideoBattleType? BattleType, bool? IsSponsorshipSupported, string SearchTerm, BattlesSortBy? BattlesSortBy, SortOrder? SortOrder, out int TotalPages, int Page = 1, int Count = 15);
        //TODO: Move to a separate file for scheduler
        void SetScheduledBattlesOpenOrClosed();
    }
}