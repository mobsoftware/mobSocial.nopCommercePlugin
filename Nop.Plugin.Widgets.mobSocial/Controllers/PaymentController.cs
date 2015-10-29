using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;
using Nop.Core;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Payments;
using Nop.Core.Domain.Shipping;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Catalog;
using Nop.Services.Customers;
using Nop.Services.Orders;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class PaymentController : BasePublicController
    {
        private readonly IWebHelper _webHelper;
        private readonly IProductService _productService;
        private readonly ICustomerService _customerService;
        private readonly ICustomerPaymentMethodService _paymentMethodService;
        private readonly IPaymentProcessingService _paymentProcessingService;
        private readonly IMobSecurityService _mobSecurityService;
        private readonly IWorkContext _workContext;
        private readonly IStoreContext _storeContext;
        private readonly IGiftCardService _giftCardService;
        private readonly IOrderService _orderService;
        private readonly IVideoBattleService _videoBattleService;
        private readonly IVoterPassService _voterPassService;
        private readonly mobSocialSettings _mobSocialSettings;

        public PaymentController(IWorkContext workContext,
         IWebHelper webHelper,
         IStoreContext storeContext,
         ICustomerService customerService,
         IProductService productService,
         IGiftCardService giftCardService,
         IOrderService orderService,
         ICustomerPaymentMethodService paymentMethodService,
         IMobSecurityService mobSecurityService,
         IPaymentProcessingService paymentProcessingService,
         IVideoBattleService videoBattleService,
         IVoterPassService voterPassService,
         mobSocialSettings mobSocialSettings)
        {
            _workContext = workContext;
            _storeContext = storeContext;
            _customerService = customerService;
            _productService = productService;
            _giftCardService = giftCardService;
            _orderService = orderService;
            _paymentMethodService = paymentMethodService;
            _mobSecurityService = mobSecurityService;
            _paymentProcessingService = paymentProcessingService;
            _videoBattleService = videoBattleService;
            _voterPassService = voterPassService;
            _mobSocialSettings = mobSocialSettings;
            _webHelper = webHelper;
        }

        public ActionResult PaymentFormPopup(int BattleId, BattleType BattleType)
        {

            //TODO: Remove comment when picture battles are ready
            var battle = _videoBattleService.GetById(BattleId); // Model.BattleType == BattleType.Video ? _videoBattleService.GetById(Model.BattleId) : null;

            var model = new CustomerPaymentPublicModel();
            model.IsAmountVariable = battle.CanVoterIncreaseVotingCharge;
            model.MinimumPaymentAmount = battle.MinimumVotingCharge;

            //also check if there are any paid orders which haven't been used for voting yet?
            var passes = _voterPassService.GetPurchasedVoterPasses(_workContext.CurrentCustomer.Id, VoterPassStatus.NotUsed);
            var orders = passes.Count > 0 ? _orderService.GetOrdersByIds(passes.Select(x => x.VoterPassOrderId).ToArray()) : null;

            if (orders != null)
            {
                foreach (var order in orders)
                {
                    model.CustomerPendingOrders.Add(new SelectListItem() {
                        Text = "Order#" + order.Id + " (" + order.OrderTotal + ")",
                        Value = order.Id.ToString()
                    });
                }
            }

            //let's get the payment methods for the logged in user
            var paymentMethods = _paymentMethodService.GetCustomerPaymentMethods(_workContext.CurrentCustomer.Id);
            foreach (var pm in paymentMethods)
            {
                model.CustomerPaymentMethods.Add(new SelectListItem()
                {
                    Text = pm.NameOnCard + " (" + pm.CardNumberMasked + ")",
                    Value = pm.Id.ToString()
                });
            }
            //battle should not be complete before payment form can be opened
            return battle.VideoBattleStatus == VideoBattleStatus.Complete ? null : PartialView("mobSocial/Payment/PaymentFormPopup", model);
        }

        [Authorize]
        [HttpPost]
        public ActionResult PurchaseVoterPass(VoterPassModel Model)
        {

            //check if the payment method provided by customer is new or an existing one
            CustomerPaymentMethod paymentMethod = null;
            if (Model.CustomerPaymentMethodId == 0)
            {
                paymentMethod = new CustomerPaymentMethod() {
                    CustomerId = _workContext.CurrentCustomer.Id,
                    IsVerified = false,
                    PaymentMethod = Model.CustomerPaymentRequest.PaymentMethod

                };

                switch (Model.CustomerPaymentRequest.PaymentMethod)
                {
                    case PaymentMethodType.CreditCard:
                    case PaymentMethodType.DebitCard:
                        //if it's a card, it should be valid. why send to payment processor if basic checks fail?

                        var cardNumber = CardHelper.StripCharacters(Model.CustomerPaymentRequest.CardNumber);
                        //let's validate the card for level 1 check (luhn's test) first before storing
                        var isCardValid = CardHelper.IsCardNumberValid(cardNumber);
                        
                        if (isCardValid)
                        {
                            var cardIssuer = CardHelper.GetCardTypeFromNumber(cardNumber);
                            var cardNumberMasked = CardHelper.MaskCardNumber(cardNumber);

                            var key = _mobSecurityService.GetSavedEncryptionKey();
                            var salt = _mobSecurityService.GetSavedSalt();
                            cardNumber = _mobSecurityService.Encrypt(cardNumber, key, salt); //encrypt the card info

                            //fine if the card is valid, but is the card number already in our record, then not possible to save the same again
                            if (_paymentMethodService.DoesCardNumberExist(cardNumber))
                            {
                                return Json(new { Success = false, Message = "The card number is already saved in records" });
                            }
                            //all good so far, but payment method will still be non-verified till first transaction is done.
                           
                            paymentMethod.CardNumber = cardNumber;
                            paymentMethod.CardNumberMasked = cardNumberMasked;
                            paymentMethod.ExpireMonth = Model.CustomerPaymentRequest.ExpireMonth;
                            paymentMethod.ExpireYear = Model.CustomerPaymentRequest.ExpireYear;
                            paymentMethod.NameOnCard = Model.CustomerPaymentRequest.NameOnCard;
                            paymentMethod.CardIssuerType = cardIssuer.ToString().ToLower();
                            paymentMethod.DateCreated = DateTime.UtcNow;
                            paymentMethod.DateUpdated = DateTime.UtcNow;
                        }
                        else
                        {
                            return Json(new { Success = false, Message = "Invalid card number" });
                        }
                        break;
                    case PaymentMethodType.BitCoin:
                        //TODO: Bitcoin related data here
                        break;
                    case PaymentMethodType.Paypal:
                        //TODO: Paypal related data here
                        break;
                }

                //save the payment method
                _paymentMethodService.Insert(paymentMethod);
            }
            else
            {
                //so we have a saved method, let's retrieve it
                paymentMethod = _paymentMethodService.GetById(Model.CustomerPaymentMethodId);

                //okays...but does this payment method actually belongs to this customer?
                if (paymentMethod.CustomerId != _workContext.CurrentCustomer.Id)
                {
                    return Json(new { Success = false, Message = "Invalid payment method" });
                }

            }
            //so we are good to go with this transaction...let's see how to proceed

            //we need to make sure that purchase amount is at least as minimum as battle
            //TODO: Remove comment when picture battles are ready
            var battle = _videoBattleService.GetById(Model.BattleId); // Model.BattleType == BattleType.Video ? _videoBattleService.GetById(Model.BattleId) : null;
            if (Model.Amount < battle.MinimumVotingCharge)
            {
                return Json(new { Success = false, Message = "Payment amount is less than minimum voting amount" });
            }
            //process the payment now
            var paymentResponse = _paymentProcessingService.ProcessPayment(_workContext.CurrentCustomer, paymentMethod);
            if (paymentResponse.Success)
            {
                //let's verify the payment method first if it's not
                if (!paymentMethod.IsVerified)
                {
                    paymentMethod.IsVerified = true;
                    _paymentMethodService.Update(paymentMethod);
                }

                //let's create voter pass
                var voterPassId = _voterPassService.CreateVoterPass(Model.BattleType, Model.BattleId, paymentResponse, paymentMethod, Model.Amount);
                
                return Json(new {Success = true, VoterPassId = voterPassId});
            }
            return Json(new { Success = false, Message = "Payment failed", Errors = paymentResponse.Errors });
            
        }
      
    }
}