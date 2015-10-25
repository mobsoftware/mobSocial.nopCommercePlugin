using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVideoBattlePrizeService : IBaseEntityService<VideoBattlePrize>
    {
        IList<VideoBattlePrize> GetBattlePrizes(int VideoBattleId);
    }
}
