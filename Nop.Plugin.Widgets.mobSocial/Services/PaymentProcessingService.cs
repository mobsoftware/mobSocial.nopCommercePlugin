using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Payments;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Payments;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class PaymentProcessingService : IPaymentProcessingService
    {
        const decimal MicroMacroPaymentSwitchingAmount = 11; //< $11.00 micro, >$11.0 macro

        private readonly mobSocialSettings _mobSocialSettings;

        public PaymentProcessingService(mobSocialSettings mobSocialSettings)
        {
            _mobSocialSettings = mobSocialSettings;
        }

        public ProcessPaymentResult ProcessPayment(Customer Customer, CustomerPaymentMethod PaymentMethod)
        {
            return new ProcessPaymentResult() {
                NewPaymentStatus = PaymentStatus.Paid
            };
        }

        public decimal GetNetAmountAfterPaymentProcessing(decimal Amount)
        {
            var fixProcessingFee = Amount < MicroMacroPaymentSwitchingAmount
                ? _mobSocialSettings.MicroPaymentsFixedPaymentProcessingFee
                : _mobSocialSettings.MacroPaymentsFixedPaymentProcessingFee;

            var processingPercentage = Amount < MicroMacroPaymentSwitchingAmount
                ? _mobSocialSettings.MicroPaymentsPaymentProcessingPercentage
                : _mobSocialSettings.MacroPaymentsPaymentProcessingPercentage;

            return Amount - fixProcessingFee - (Amount * processingPercentage / 100);
        }
    }
}