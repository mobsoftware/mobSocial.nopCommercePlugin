using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Payments;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class PaymentProcessingService : IPaymentProcessingService
    {
     
        public ProcessPaymentResult ProcessPayment(Customer Customer, CustomerPaymentMethod PaymentMethod)
        {
            return new ProcessPaymentResult() {
                
            };
        }
    }
}