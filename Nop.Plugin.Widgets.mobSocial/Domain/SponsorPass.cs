using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class SponsorPass : BaseMobEntity
    {
        public int CustomerId { get; set; }

        public int SponsorPassOrderId { get; set; }

        public PassStatus Status { get; set; }

        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }
    }
}
