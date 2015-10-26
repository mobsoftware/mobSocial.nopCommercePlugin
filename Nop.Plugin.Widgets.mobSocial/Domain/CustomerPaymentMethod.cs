using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerPaymentMethod : BaseMobEntity
    {
        public int CustomerId { get; set; }

        public PaymentMethodType PaymentMethod { get; set; }

        public string CardNumber { get; set; }

        public string NameOnCard { get; set; }

        public string ExpireMonth { get; set; }

        public string ExpireYear { get; set; }

        public string CardIssuerType { get; set; }

        public bool IsVerified { get; set; }

    }
}
