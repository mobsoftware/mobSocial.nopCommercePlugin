using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class UpdateSponsorModel: BaseNopModel
    {
        public int SponsorCustomerId { get; set; }

        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }

        public SponsorshipStatus SponsorshipStatus { get; set; }

        public string TargetUrl { get; set; }

        public string DisplayName { get; set; }

        public int PictureId { get; set; }
    }
}