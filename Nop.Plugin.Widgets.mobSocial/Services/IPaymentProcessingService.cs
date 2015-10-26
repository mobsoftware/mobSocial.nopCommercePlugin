using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Payments;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IPaymentProcessingService
    {
        ProcessPaymentResult ProcessPayment(Customer Customer, CustomerPaymentMethod PaymentMethod);
    }
}