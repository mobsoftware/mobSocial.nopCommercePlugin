using Nop.Web.Models.Customer;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerPaymentWithAddressModel
    {
        public CustomerPaymentModel CustomerPaymentModel { get; set; }

        public CustomerAddressEditModel CustomerAddressEditModel { get; set; }
    }
}