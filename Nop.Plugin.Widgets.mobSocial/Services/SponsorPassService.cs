using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Shipping;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Services.Catalog;
using Nop.Services.Orders;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class SponsorPassService : BaseEntityService<SponsorPass>, ISponsorPassService
    {

        private readonly IWorkContext _workContext;
        private readonly IStoreContext _storeContext;
        private readonly IOrderService _orderService;
        private readonly IProductService _productService;
        private readonly IWebHelper _webHelper;
        private readonly mobSocialSettings _mobSocialSettings;

        public SponsorPassService(IMobRepository<SponsorPass> repository,
             IMobRepository<Sponsor> sponsorRepository,
             IWorkContext workContext,
             IStoreContext storeContext,
             IOrderService orderService,
             IProductService productService,
             IWebHelper webHelper,
             mobSocialSettings mobSocialSettings)
            : base(repository)
        {
            _workContext = workContext;
            _storeContext = storeContext;
            _orderService = orderService;
            _productService = productService;
            _webHelper = webHelper;
            _mobSocialSettings = mobSocialSettings;
        }


        public override List<SponsorPass> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new System.NotImplementedException();
        }

        public Nop.Core.Domain.Orders.Order GetSponsorPassOrder(int SponsorPassOrderId)
        {
            var order = _orderService.GetOrderById(SponsorPassOrderId);
            return order;
        }

        public IList<Order> GetSponsorPassOrders(int SponsorCustomerId, int BattleId, BattleType BattleType)
        {
            
            var orderIds = Repository.Table.Where(x => x.CustomerId == SponsorCustomerId && x.Status == PassStatus.Used && x.BattleType == BattleType && x.BattleId == BattleId)
                .Select(x => x.SponsorPassOrderId);

            var orders = _orderService.GetOrdersByIds(orderIds.ToArray());
            return orders;


        }
        
        public IList<SponsorPass> GetPurchasedSponsorPasses(int CustomerId, Enums.PassStatus? SponsorPassStatus)
        {
            var passes = Repository.Table.Where(x => x.CustomerId == CustomerId);
            if (SponsorPassStatus.HasValue)
                passes = passes.Where(x => x.Status == SponsorPassStatus);
            return passes.ToList();
        }

        public int CreateSponsorPass(BattleType BattleType, int BattleId,Nop.Services.Payments.ProcessPaymentResult PaymentResponse, CustomerPaymentMethod PaymentMethod, decimal Amount)
        {
            //first we'll create an order, let's first get the associated product for voter pass
            var voterPassProduct = GetSponsorPassProduct();

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
            var sponsorPass = new SponsorPass() {
                CustomerId = _workContext.CurrentCustomer.Id,
                DateCreated = DateTime.UtcNow,
                DateUpdated = DateTime.UtcNow,
                Status = PassStatus.NotUsed,
                SponsorPassOrderId = order.Id,
                BattleType = BattleType,
                BattleId = BattleId
            };
            //save this pass details
            this.Insert(sponsorPass);

            return order.Id;
        }

        private Product GetSponsorPassProduct()
        {
            var sponsorPass = _productService.GetProductBySku(MobSocialConstant.SponsorPassSKU);
            if (sponsorPass != null) return sponsorPass;
            //the product doesn't exist...so let's create the product first
            sponsorPass = new Product() {
                Name = "Sponsor Pass",
                ProductType = ProductType.SimpleProduct,
                ShowOnHomePage = false,
                Sku = MobSocialConstant.SponsorPassSKU,
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
            _productService.InsertProduct(sponsorPass);

            return sponsorPass;
        }

        public void MarkSponsorPassUsed(int SponsorPassOrderId, int BattleId, BattleType BattleType)
        {
            var sponsorPass = GetSponsorPassByOrderId(SponsorPassOrderId);
            sponsorPass.Status = PassStatus.Used;
            //make the passes usable interchangeably for picture and video battles
            sponsorPass.BattleType = BattleType;
            sponsorPass.BattleId = BattleId;
            this.Update(sponsorPass);
        }

        public SponsorPass GetSponsorPassByOrderId(int OrderId)
        {
            return Repository.Table.FirstOrDefault(x => x.SponsorPassOrderId == OrderId);
        }
    }
}