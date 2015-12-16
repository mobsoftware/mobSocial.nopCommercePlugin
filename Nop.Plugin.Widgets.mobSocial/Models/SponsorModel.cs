using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SponsorModel: BaseNopEntityModel
    {
        public int SponsorPassId { get; set; }

        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }
    }
}