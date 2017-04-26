using System.Web.Mvc;
using mobSocial.Services.Battles;
using mobSocial.Services.Payments;
using Nop.Core;
using Nop.Core.Domain.Common;
using Nop.Services.Catalog;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Directory;
using Nop.Services.Localization;
using Nop.Services.Orders;
using Nop.Web.Controllers;
using Nop.Web.Models.Customer;

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
        private readonly ISponsorPassService _sponsorPassService;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly AddressSettings _addressSettings;
        private readonly ILocalizationService _localizationService;
        private readonly IAddressAttributeService _addressAttributeService;
        private readonly IAddressAttributeParser _addressAttributeParser;
        private readonly ICountryService _countryService;
        private readonly IStateProvinceService _stateProvinceService;

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
         ISponsorPassService sponsorPassService,
         mobSocialSettings mobSocialSettings, IAddressAttributeService addressAttributeService, AddressSettings addressSettings, ILocalizationService localizationService, IAddressAttributeParser addressAttributeParser, ICountryService countryService, IStateProvinceService stateProvinceService)
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
            _sponsorPassService = sponsorPassService;
            _mobSocialSettings = mobSocialSettings;
            _addressAttributeService = addressAttributeService;
            _addressSettings = addressSettings;
            _localizationService = localizationService;
            _addressAttributeParser = addressAttributeParser;
            _countryService = countryService;
            _stateProvinceService = stateProvinceService;
            _webHelper = webHelper;
        }

        [HttpPost]
        [Authorize]
        public ActionResult PaymentFormPopup()
        {
            return View("mobSocial/Payment/PaymentFormPopup");
        }

        [Authorize]
        public ActionResult AddressFormPopup(CustomerPaymentModel CustomerPaymentModel)
        {
            var model = new CustomerPaymentWithAddressModel { CustomerAddressEditModel = new CustomerAddressEditModel(), CustomerPaymentModel = CustomerPaymentModel };


            //because a customer might not have any address, order creation will trigger an error, therefore let's allow customer to add an address
            model.CustomerAddressEditModel.Address.PrepareModel(
                address: null,
                excludeProperties: false,
                addressSettings: _addressSettings,
                localizationService: _localizationService,
                stateProvinceService: _stateProvinceService,
                addressAttributeService: _addressAttributeService,
                addressAttributeParser: _addressAttributeParser,
                loadCountries: () => _countryService.GetAllCountries());

            return View("mobSocial/Payment/AddressFormPopup", model);
        }

      
    }
}