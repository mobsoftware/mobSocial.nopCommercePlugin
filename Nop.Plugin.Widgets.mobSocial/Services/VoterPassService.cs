using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Payments;
using Nop.Core.Domain.Shipping;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Services.Catalog;
using Nop.Services.Orders;
using Nop.Services.Payments;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VoterPassService : BaseEntityService<VoterPass>, IVoterPassService
    {
 
        private readonly IWorkContext _workContext;
        private readonly IStoreContext _storeContext;
        private readonly IOrderService _orderService;
        private readonly IProductService _productService;
        private readonly IWebHelper _webHelper;
        private readonly mobSocialSettings _mobSocialSettings;

        public VoterPassService(IMobRepository<VoterPass> repository,
            IWorkContext workContext, 
            IStoreContext storeContext, 
            IOrderService orderService, 
            IProductService productService,
            IWebHelper webHelper,
            mobSocialSettings mobSocialSettings) : base(repository)
        {
            _workContext = workContext;
            _storeContext = storeContext;
            _orderService = orderService;
            _productService = productService;
            _webHelper = webHelper;
            _mobSocialSettings = mobSocialSettings;
        }

        public Order GetVoterPassOrder(int VoterPassOrderId)
        {
            var order = _orderService.GetOrderById(VoterPassOrderId);
            return order;
        }

        public IList<VoterPass> GetPurchasedVoterPasses(int CustomerId, PassStatus? VotePassStatus)
        {
            var passes = Repository.Table.Where(x => x.CustomerId == CustomerId);
            if (VotePassStatus.HasValue)
                passes = passes.Where(x => x.Status == VotePassStatus);
            return passes.ToList();
        }

      

        public int CreateVoterPass(BattleType BattleType, int BattleId , ProcessPaymentResult PaymentResponse, CustomerPaymentMethod PaymentMethod, decimal Amount)
        {
            //first we'll create an order, let's first get the associated product for voter pass
            var voterPassProduct = GetVoterPassProduct(BattleType);

            //place an order on user's behalf
            var order = new Order() {
                CreatedOnUtc = DateTime.UtcNow,
                CustomerId = _workContext.CurrentCustomer.Id,
                StoreId = _storeContext.CurrentStore.Id,
                BillingAddress = _workContext.CurrentCustomer.Addresses.First(),
                ShippingAddress = _workContext.CurrentCustomer.Addresses.First(),
                AuthorizationTransactionCode = PaymentResponse.AuthorizationTransactionCode,
                AuthorizationTransactionId = PaymentResponse.AuthorizationTransactionId,
                AuthorizationTransactionResult = PaymentResponse.AuthorizationTransactionResult,
                CustomerIp = _webHelper.GetCurrentIpAddress(),
                OrderStatus = OrderStatus.Complete,
                PaymentStatus = PaymentResponse.NewPaymentStatus,
                ShippingStatus = ShippingStatus.ShippingNotRequired,
                PaymentMethodSystemName = "MobSocial.Payments." + PaymentMethod.PaymentMethod.ToString(),
                OrderTotal = Amount,
                OrderSubtotalExclTax = Amount,
                OrderSubTotalDiscountInclTax = Amount,
                OrderGuid = Guid.NewGuid(),
                CustomerCurrencyCode = _workContext.WorkingCurrency.CurrencyCode,
                CurrencyRate = _workContext.WorkingCurrency.Rate
            };
            var orderItem = new OrderItem() {
                OrderItemGuid = Guid.NewGuid(),
                ProductId = voterPassProduct.Id,
                UnitPriceExclTax = Amount,
                UnitPriceInclTax = Amount,
                PriceInclTax = Amount,
                PriceExclTax = Amount,
                Quantity = 1
            };
            order.OrderItems.Add(orderItem);
            //save the order now
            _orderService.InsertOrder(order);

            //now add this voter pass for future reference
            var voterPass = new VoterPass()
            {
                BattleId = BattleId,
                BattleType = BattleType,
                CustomerId = _workContext.CurrentCustomer.Id,
                DateCreated = DateTime.UtcNow,
                DateUpdated = DateTime.UtcNow,
                Status = PassStatus.NotUsed,
                VoterPassOrderId = order.Id
            };
            //save this pass details
            this.Insert(voterPass);

            return order.Id;
        }

        public void MarkVoterPassUsed(int VoterPassOrderId)
        {
            var voterPass = GetVoterPassByOrderId(VoterPassOrderId);
            voterPass.Status = PassStatus.Used;
            this.Update(voterPass);
        }

        public VoterPass GetVoterPassByOrderId(int OrderId)
        {
           return Repository.Table.FirstOrDefault(x => x.VoterPassOrderId == OrderId);
        }

        private Product GetVoterPassProduct(BattleType BattleType)
        {
            var voterPass = _productService.GetProductBySku(BattleType == Enums.BattleType.Video ? MobSocialConstant.VideoBattleVoterPassSKU : MobSocialConstant.PictureBattleVoterPassSKU);
            if (voterPass == null)
            {
                //the product doesn't exist...so let's create the product first
                voterPass = new Product() {
                    Name = "Voter Pass for " + BattleType.ToString(),
                    ProductType = ProductType.SimpleProduct,
                    ShowOnHomePage = false,
                    Sku = BattleType == BattleType.Video ? MobSocialConstant.VideoBattleVoterPassSKU : MobSocialConstant.PictureBattleVoterPassSKU,
                    VisibleIndividually = false,
                    IsShipEnabled = false,
                    IsDownload = false,
                    IsGiftCard = false,
                    GiftCardType = GiftCardType.Virtual,
                    CustomerEntersPrice = true,
                    MinimumCustomerEnteredPrice = _mobSocialSettings.DefaultVotingChargeForPaidVoting,
                    MaximumCustomerEnteredPrice = 0, //no limit
                    Price = _mobSocialSettings.DefaultVotingChargeForPaidVoting,
                    AllowCustomerReviews = false,
                    SubjectToAcl = false,
                    LimitedToStores = false,
                    HasTierPrices = false,
                    HasDiscountsApplied = false,
                    CreatedOnUtc = DateTime.UtcNow,
                    UpdatedOnUtc = DateTime.UtcNow,
                    DisplayOrder = 0,
                    Published = true
                };
                _productService.InsertProduct(voterPass);
            }

            return voterPass;
        }

        public override List<VoterPass> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}