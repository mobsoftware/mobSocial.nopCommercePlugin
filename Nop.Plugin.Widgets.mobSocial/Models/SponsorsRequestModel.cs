using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SponsorsRequestModel : BaseNopModel
    {
        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }

        public string BattleName { get; set; }

        public string BattleUrl { get; set; }

        public SponsorshipStatus SponsorshipStatus { get; set; }
    }
}