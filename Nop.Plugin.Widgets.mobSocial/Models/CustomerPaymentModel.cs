using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerPaymentModel : BaseNopModel
    {
        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }

        public PurchaseType PurchaseType { get; set; }
    }
}