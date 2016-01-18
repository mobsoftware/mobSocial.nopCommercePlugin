using System.Linq;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Payments;
using Nop.Core.Plugins;
using Nop.Plugin.Payments.PayPalDirect;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Payments;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class PaymentProcessingService : IPaymentProcessingService
    {
        const decimal MicroMacroPaymentSwitchingAmount = 11; //< $11.00 micro, >$11.0 macro

        private readonly mobSocialSettings _mobSocialSettings;
        private readonly IPluginFinder _pluginFinder;
        private readonly IMobSecurityService _mobSecurityService;

        public PaymentProcessingService(mobSocialSettings mobSocialSettings, IPluginFinder pluginFinder, IMobSecurityService mobSecurityService)
        {
            _mobSocialSettings = mobSocialSettings;
            _pluginFinder = pluginFinder;
            _mobSecurityService = mobSecurityService;
        }

        public ProcessPaymentResult ProcessPayment(Customer Customer, CustomerPaymentMethod PaymentMethod, decimal PaymentAmount)
        {
            //check if the plugin is installed and activated
            //depending on the payment amount, we may wish to switch between macro and micro payments
            //check if plugin is installed or not
            var isInstalled = false;
            //TODO: Change the other payment method to appropriate one for macro payments
            var paymentPluginSystemName = PaymentAmount < MicroMacroPaymentSwitchingAmount ? "Payments.PayPalDirect" : "Payments.PayPalDirect";
            var pluginDescriptor = _pluginFinder.GetPluginDescriptorBySystemName(paymentPluginSystemName);

            if (pluginDescriptor != null && pluginDescriptor.Installed)
            {
                isInstalled = true;
            }
            
            //is installed
            if (!isInstalled)
                return null;

            var plugin = pluginDescriptor.Instance() as PayPalDirectPaymentProcessor;
            if (plugin == null)
                return null;

            //default to first billing address
            Customer.BillingAddress = Customer.BillingAddress ?? Customer.Addresses.First();

            var key = _mobSecurityService.GetSavedEncryptionKey();
            var salt = _mobSecurityService.GetSavedSalt();

            //decrypt card number stored for processing
            var cardNumber = _mobSecurityService.Decrypt(PaymentMethod.CardNumber, key, salt); //decrypt the card info

            //now create a payment processing request
            var paymentProcessingRequest = new ProcessPaymentRequest()
            {
                CustomerId = Customer.Id,
                OrderTotal = PaymentAmount,
                CreditCardName = PaymentMethod.NameOnCard,
                CreditCardExpireMonth = int.Parse(PaymentMethod.ExpireMonth),
                CreditCardExpireYear = int.Parse(PaymentMethod.ExpireYear),
                PaymentMethodSystemName = paymentPluginSystemName,
                CreditCardType = PaymentMethod.CardIssuerType,
                CreditCardNumber = cardNumber,
                IsRecurringPayment = false,
                StoreId = 0
            };

            return plugin.ProcessPayment(paymentProcessingRequest);
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