using Nop.Web.Framework.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class ArtistPagePaymentModel: BaseNopEntityModel
    {
        public int ArtistPageId { get; set; }
        public int PaymentTypeId { get; set; }
        public string PaypalEmail { get; set; }
        public string BankName { get; set; }
        public string RoutingNumber { get; set; }
        public string AccountNumber { get; set; }
        public string PayableTo { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
    }
}
