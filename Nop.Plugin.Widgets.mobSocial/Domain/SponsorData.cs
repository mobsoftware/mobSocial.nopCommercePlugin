using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class SponsorData : BaseMobEntity
    {
        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }

        public int SponsorCustomerId { get; set; }

        public int PictureId { get; set; }

        public int DisplayOrder { get; set; }

        public string TargetUrl { get; set; }

        public string DisplayName { get; set; }
    }
}
