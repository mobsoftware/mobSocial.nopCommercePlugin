using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;
using Nop.Core;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Payments;
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
        private readonly mobSocialSettings _mobSocialSettings;

        public PaymentController(IWorkContext workContext,
         IStoreContext storeContext,
         ICustomerService customerService,
         IProductService productService,
         IGiftCardService giftCardService,
         IOrderService orderService,
         ICustomerPaymentMethodService paymentMethodService,
         IMobSecurityService mobSecurityService,
         IPaymentProcessingService paymentProcessingService,
         IVideoBattleService videoBattleService,
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
            _mobSocialSettings = mobSocialSettings;
        }

        [ChildActionOnly]
        public ActionResult PaymentFormPopup(int BattleId, BattleType BattleType)
        {
            //let's get the payment methods for the logged in user
            var paymentMethods = _paymentMethodService.GetCustomerPaymentMethods(_workContext.CurrentCustomer.Id);

            //TODO: Remove comment when picture battles are ready
            var battle = _videoBattleService.GetById(BattleId); // Model.BattleType == BattleType.Video ? _videoBattleService.GetById(Model.BattleId) : null;

            var model = new CustomerPaymentPublicModel();

            foreach (var pm in paymentMethods)
            {
                model.CustomerPaymentMethods.Add(new SelectListItem()
                {
                    Text = pm.NameOnCard,
                    Value = pm.Id.ToString()
                });
            }
            //battle should not be complete before payment form can be opened
            return battle.VideoBattleStatus == VideoBattleStatus.Complete ? null : View("mobSocial/Payment/PaymentFormPopup", model);
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
                    IsVerified = false

                };

                switch (Model.CustomerPaymentRequest.PaymentMethod)
                {
                    case PaymentMethodType.CreditCard:
                    case PaymentMethodType.DebitCard:
                        //if it's a card, it should be valid. why send to payment processor if basic checks fail?

                        var cardNumber = Model.CustomerPaymentRequest.CardNumber;
                        //let's validate the card for level 1 check (luhn's test) first before storing
                        var isCardValid = CardHelper.IsCardNumberValid(cardNumber);

                        if (isCardValid)
                        {
                            var key = ConfigurationManager.AppSettings.Get(MobSocialConstant.EncryptionKeyName);
                            cardNumber = _mobSecurityService.Encrypt(cardNumber, key); //encrypt the card info

                            //fine if the card is valid, but is the card number already in our record, then not possible to save the same again
                            if (_paymentMethodService.DoesCardNumberExist(cardNumber))
                            {
                                return Json(new { Success = false, Message = "The card number is already saved in records" });
                            }
                            //all good so far, but payment method will still be non-verified till first transaction is done.
                           
                            paymentMethod.CardNumber = cardNumber;
                            paymentMethod.ExpireMonth = Model.CustomerPaymentRequest.ExpireMonth;
                            paymentMethod.ExpireYear = Model.CustomerPaymentRequest.ExpireYear;
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
            if (Model.VotingAmount < battle.MinimumVotingCharge)
            {
                return Json(new { Success = false, Message = "Payment amount is less than minimum voting amount" });
            }
            //process the payment now
            var paymentResponse = _paymentProcessingService.ProcessPayment(_workContext.CurrentCustomer, paymentMethod);
            if (paymentResponse.Success)
            {
                //let's verify the payment method first
                paymentMethod.IsVerified = true;
                _paymentMethodService.Update(paymentMethod);

                //first we'll create an order, let's first get the associated product for voter pass
                var voterPass = GetVoterPassProduct(Model.BattleType);
                var giftCard = new GiftCard()
                {
                   Amount = Model.VotingAmount,
                   GiftCardType = voterPass.GiftCardType,
                   IsGiftCardActivated = true,
                   IsRecipientNotified = true,
                   CreatedOnUtc = DateTime.UtcNow,
                   GiftCardCouponCode = _giftCardService.GenerateGiftCardCode()
                };
                _giftCardService.InsertGiftCard(giftCard);
                
                               
                //place an order on user's behalf for this order
                var order = new Order()
                {
                    CreatedOnUtc = DateTime.UtcNow,
                    CustomerId = _workContext.CurrentCustomer.Id,
                    StoreId = _storeContext.CurrentStore.Id,
                    BillingAddress = _workContext.CurrentCustomer.BillingAddress,
                    AuthorizationTransactionCode = paymentResponse.AuthorizationTransactionCode,
                    AuthorizationTransactionId = paymentResponse.AuthorizationTransactionId,
                    AuthorizationTransactionResult = paymentResponse.AuthorizationTransactionResult,
                    CustomerIp = Request.UserHostAddress,
                    OrderStatus = OrderStatus.Complete,
                    OrderGuid = Guid.NewGuid()
                };
                var orderItem = new OrderItem()
                {
                    OrderItemGuid = Guid.NewGuid(),
                    ProductId = voterPass.Id,
                    UnitPriceExclTax = giftCard.Amount,
                    UnitPriceInclTax = giftCard.Amount,
                    PriceInclTax = giftCard.Amount,
                    PriceExclTax = giftCard.Amount,

                };
                orderItem.AssociatedGiftCards.Add(giftCard);
                order.OrderItems.Add(orderItem);
                //save the order now
                _orderService.InsertOrder(order);
                return Json(new {Success = true});


            }
            return Json(new { Success = false, Errors = paymentResponse.Errors });

        }

        #region helpers

        Product GetVoterPassProduct(BattleType BattleType)
        {
            var voterPass = _productService.GetProductBySku(BattleType == BattleType.Video ? MobSocialConstant.VideoBattleVoterPassSKU : MobSocialConstant.PictureBattleVoterPassSKU);
            if (voterPass == null)
            {
                //the product doesn't exist...so let's create the product first
                voterPass = new Product() {
                    Name = "Voter Pass for " + BattleType.ToString(),
                    Sku = BattleType == BattleType.Video ? MobSocialConstant.VideoBattleVoterPassSKU : MobSocialConstant.PictureBattleVoterPassSKU,
                    VisibleIndividually = false,
                    IsShipEnabled = false,
                    IsDownload = false,
                    IsGiftCard = true,
                    GiftCardType = GiftCardType.Virtual,
                    CustomerEntersPrice = true,
                    MinimumCustomerEnteredPrice = _mobSocialSettings.DefaultVotingChargeForPaidVoting,
                    MaximumCustomerEnteredPrice = decimal.MaxValue, //will the customer pay more than this?
                    Price = _mobSocialSettings.DefaultVotingChargeForPaidVoting,
                    AllowCustomerReviews = false,
                };
                _productService.InsertProduct(voterPass);
            }

            return voterPass;
        }

        #endregion
    }
}