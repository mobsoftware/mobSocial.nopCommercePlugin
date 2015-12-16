using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SponsorTransactionRequestModel : BaseNopModel
    {
        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }

        public int CustomerId { get; set; }

    }
}