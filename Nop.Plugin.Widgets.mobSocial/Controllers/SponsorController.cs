using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using mobSocial.Data.Enum;
using mobSocial.Services.Battles;
using mobSocial.Services.Sponsors;
using mobSocial.WebApi.Models.Battles;
using mobSocial.WebApi.Models.Sponsors;
using Nop.Core;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SponsorController : BasePublicController
    {
        #region Fields

        private readonly IWorkContext _workContext;
        private readonly ISponsorService _sponsorService;
        private readonly IVideoBattlePrizeService _videoBattlePrizeService;

        #endregion

        #region ctor
        public SponsorController(IWorkContext workContext,
            ISponsorService sponsorService,
            IVideoBattlePrizeService videoBattlePrizeService)
        {
            _workContext = workContext;
            _sponsorService = sponsorService;
            _videoBattlePrizeService = videoBattlePrizeService;
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
                    PrizeType = BattlePrizeType.Other,
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