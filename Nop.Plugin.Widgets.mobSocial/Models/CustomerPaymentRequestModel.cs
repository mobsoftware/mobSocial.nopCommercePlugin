using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerPaymentRequestModel
    {
        public int CustomerId { get; set; }

        public PaymentMethodType PaymentMethod { get; set; }

        public string CardNumber { get; set; }

        public string NameOnCard { get; set; }

        public string SecurityCode { get; set; }

        public string ExpireMonth { get; set; }

        public string ExpireYear { get; set; }

        public string CardIssuerType { get; set; }

        public bool IsVerified { get; set; }
    }
}
