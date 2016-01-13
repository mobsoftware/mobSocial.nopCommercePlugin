
using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Catalog;
using Nop.Services.Configuration;

namespace Nop.Plugin.Widgets.MobSocial.Extensions
{
    public static class BattleExtensions
    {
        public static string GetConsolidatedPrizesString(this VideoBattle Battle, 
            List<VideoBattlePrize> allPrizes, 
            int? WinnerPosition,
            IWorkContext _workContext,
            IProductService _productService,
            ISponsorService _sponsorService,
            IVoterPassService _voterPassService,
            IVideoBattlePrizeService _videoBattlePrizeService,
            IPriceFormatter _priceFormatter, 
            ISettingService _settingService,
            IPaymentProcessingService _paymentProcessingService,
            mobSocialSettings _mobSocialSettings)
        {

            var battleOwnerPrizes = allPrizes.Where(x => !x.IsSponsored  && (!WinnerPosition.HasValue || x.WinnerPosition == WinnerPosition.Value));
            var sponsoredPrizes = allPrizes.Where(x => x.IsSponsored && (!WinnerPosition.HasValue || x.WinnerPosition == WinnerPosition.Value));

            var totalPrizesAmountFixed =
                battleOwnerPrizes.Where(x => x.PrizeType == VideoBattlePrizeType.FixedAmount).Sum(x => x.PrizeAmount);

            var totalPrizesAmountPercentage = 0m;
            if (battleOwnerPrizes.Any(x => x.PrizeType == VideoBattlePrizeType.PercentageAmount))
            {
                var orders = _voterPassService.GetAllVoterPassOrders(BattleType.Video, Battle.Id, PassStatus.Used);
                var orderSum = orders.Sum(x => x.OrderTotal);
                var netOrderSum = _paymentProcessingService.GetNetAmountAfterPaymentProcessing(orderSum);

                var totalWinners = battleOwnerPrizes.Count();

                //total voting amount from percentage
                totalPrizesAmountPercentage = netOrderSum -
                                              totalWinners*netOrderSum*Battle.ParticipantPercentagePerVote/100;



            }

            var sponsorships = _sponsorService.GetSponsorsGrouped(null, Battle.Id, BattleType.Video,
                SponsorshipStatus.Accepted);

            var sponsorshipAmount = sponsorships.Sum(x => x.SponsorshipAmount);

            //amount after payment processing
            var netSponsorshipAmount = _paymentProcessingService.GetNetAmountAfterPaymentProcessing(sponsorshipAmount);

            var siteOwnerShare = netSponsorshipAmount * _mobSocialSettings.SiteOwnerSponsorshipPercentage / 100;

            //it may be possible that battle host himself is sponsor, he won't be getting commissions for that :)
            var battleHostAsSponsorAmount =
                sponsorships.Where(x => x.CustomerId == Battle.ChallengerId).Sum(x => x.SponsorshipAmount);


            var battleHostShare = (netSponsorshipAmount - battleHostAsSponsorAmount) * _mobSocialSettings.BattleHostSponsorshipPercentage / 100;

            //amount available for winners
            var winnerPrizePool = netSponsorshipAmount - siteOwnerShare - battleHostShare;

            if (WinnerPosition.HasValue)
            {
                winnerPrizePool = PrizeDistributionHelper.GetPrizeDistributionPercentage(WinnerPosition.Value,
                    allPrizes.Count(x => !x.IsSponsored), _settingService) * winnerPrizePool;
            }

            var totalAmount = Math.Round(totalPrizesAmountFixed + totalPrizesAmountPercentage + winnerPrizePool);

            var totalPrizeString = totalAmount > 0 ? _priceFormatter.FormatPrice(totalAmount, true, _workContext.WorkingCurrency) : "";


            if (allPrizes.Any(
                x => x.PrizeType == VideoBattlePrizeType.FixedProduct || x.PrizeType == VideoBattlePrizeType.Other))
            {
                if (!WinnerPosition.HasValue)
                    totalPrizeString += "+";
                else
                {
                    //now append each product as prize with it's name to the prize string
                    foreach (var prize in battleOwnerPrizes.Where(x => x.PrizeType == VideoBattlePrizeType.FixedProduct || x.PrizeType == VideoBattlePrizeType.Other))
                    {
                        if (prize.PrizeType == VideoBattlePrizeType.FixedProduct)
                        {
                            var product = _productService.GetProductById(prize.PrizeProductId);
                            if (product != null)
                            {
                                totalPrizeString += (totalPrizeString != "" ? " + " : "") + product.Name;
                            }
                            else
                            {
                                totalPrizeString += (totalPrizeString != "" ? " + " : "") + prize.PrizeProductId;
                            }
                        }
                        else
                        {
                            totalPrizeString += (totalPrizeString != "" ? " + " : "") + prize.PrizeOther;
                        }
                    }
                    //and sponsored products
                    foreach (var prize in sponsoredPrizes.Where(x => x.PrizeType == VideoBattlePrizeType.Other))
                    {
                        totalPrizeString += (totalPrizeString != "" ? " + " : "") + prize.PrizeOther + "*";
                    }
                }
            }

            return totalPrizeString;
        }

    }
}