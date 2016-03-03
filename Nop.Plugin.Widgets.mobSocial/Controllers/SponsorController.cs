using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Nop.Core;
using Nop.Core.Domain.Media;
using Nop.Plugin.WebApi.mobSocial.Services;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Plugin.WebApi.MobSocial.Enums;
using Nop.Plugin.WebApi.MobSocial.Extensions;
using Nop.Plugin.WebApi.MobSocial.Models;
using Nop.Services.Catalog;
using Nop.Services.Customers;
using Nop.Services.Directory;
using Nop.Services.Helpers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Orders;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SponsorController : BasePublicController
    {
        #region Fields

        private readonly IWorkContext _workContext;
        private readonly IStoreContext _storeContext;
        private readonly ISponsorService _sponsorService;
        private readonly ISponsorPassService _sponsorPassService;
        private readonly IPaymentProcessingService _paymentProcessingService;
        private readonly IOrderService _orderService;
        private readonly IVideoBattleService _videoBattleService;
        private readonly IVideoBattlePrizeService _videoBattlePrizeService;
        private readonly ICustomerService _customerService;
        private readonly IPictureService _pictureService;
        private readonly IPriceFormatter _priceFormatter;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly ILocalizationService _localizationService;
        private readonly ICurrencyService _currencyService;
        private readonly IMobSocialMessageService _mobSocialMessageService;
        private readonly MediaSettings _mediaSettings;

        #endregion

        #region ctor
        public SponsorController(IWorkContext workContext,
            ISponsorService sponsorService,
            ISponsorPassService sponsorPassService,
            IOrderService orderService,
            IVideoBattleService videoBattleService,
            ICustomerService customerService,
            IPictureService pictureService,
            IPriceFormatter priceFormatter,
            IDateTimeHelper dateTimeHelper,
            ILocalizationService localizationService,
            ICurrencyService currencyService,
            MediaSettings mediaSettings, IMobSocialMessageService mobSocialMessageService, IStoreContext storeContext, IVideoBattlePrizeService videoBattlePrizeService, IPaymentProcessingService paymentProcessingService)
        {
            _workContext = workContext;
            _sponsorPassService = sponsorPassService;
            _sponsorService = sponsorService;
            _orderService = orderService;
            _videoBattleService = videoBattleService;
            _customerService = customerService;
            _pictureService = pictureService;
            _priceFormatter = priceFormatter;
            _dateTimeHelper = dateTimeHelper;
            _localizationService = localizationService;
            _currencyService = currencyService;
            _mediaSettings = mediaSettings;
            _mobSocialMessageService = mobSocialMessageService;
            _storeContext = storeContext;
            _videoBattlePrizeService = videoBattlePrizeService;
            _paymentProcessingService = paymentProcessingService;
        }
        #endregion



        #region Methods
       
        
        public ActionResult SponsorDashboard(BattleType BattleType, int BattleId)
        {
            var model = new SponsorsRequestModel() {
                BattleType = BattleType,
                BattleId = BattleId,
                SponsorshipStatus = SponsorshipStatus.Pending,
            };
            return View("mobSocial/Sponsor/SponsorDashboard", model);
        }

        [HttpPost]
        [Authorize]
        public ActionResult ProductPrizesFormPopup(int BattleId, BattleType BattleType)
        {
            //check if current user is already a sponsor, he should then be doing everything from sponsor dashboard only
            if (_sponsorService.GetSponsors(_workContext.CurrentCustomer.Id, BattleId, BattleType, null).Any())
            {
                return null;
            }

            var allPrizes = _videoBattlePrizeService.GetBattlePrizes(BattleId);
            var totalWinningPositions = allPrizes.Count(x => !x.IsSponsored);

            var model = new List<VideoBattlePrizeModel>();
            for (var index = 1; index <= totalWinningPositions; index++)
            {
                model.Add(new VideoBattlePrizeModel()
                {
                    WinnerPosition = index,
                    PrizeType = VideoBattlePrizeType.Other,
                    IsSponsored = true,
                    PrizeOther = "",
                    SponsorCustomerId = _workContext.CurrentCustomer.Id,
                    VideoBattleId = BattleId
                });
            }
            return View("mobSocial/Sponsor/ProductPrizesFormPopup", model);
        }


        #endregion
    }
}