using System.Linq;
using System.Runtime.CompilerServices;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Catalog;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Media;

namespace Nop.Plugin.Widgets.MobSocial.Extensions
{
    public static class SponsorExtensions
    {
        public static SponsorPublicModel ToPublicModel(this Sponsor Sponsor, IWorkContext _workContext,
            ICustomerService _customerService, IPictureService _pictureService, ISponsorService _sponsorService, IPriceFormatter _priceFormatter, MediaSettings _mediaSettings)
        {
            var customer = _customerService.GetCustomerById(Sponsor.CustomerId);
            if (customer == null)
                return null;

            //get sponsor data
            var sponsorData = _sponsorService.GetSponsorData(Sponsor.BattleId, Sponsor.BattleType, Sponsor.CustomerId);

            var model = new SponsorPublicModel
            {
                SponsorshipStatus = Sponsor.SponsorshipStatus,
                SponsorshipStatusName = Sponsor.SponsorshipStatus.ToString(),
                CustomerId = Sponsor.CustomerId,
                SeName = customer.GetSeName(_workContext.WorkingLanguage.Id),
                SponsorName = customer.GetFullName(),
                SponsorProfileImageUrl =
                    _pictureService.GetPictureUrl(
                        customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        _mediaSettings.AvatarPictureSize, false),
                SponsorshipAmount = Sponsor.SponsorshipAmount,
                SponsorshipAmountFormatted =
                    _priceFormatter.FormatPrice(Sponsor.SponsorshipAmount, true, _workContext.WorkingCurrency),
                SponsorData = sponsorData.ToModel(_pictureService),
            };


            return model;
        }

        public static SponsorDataModel ToModel(this SponsorData SponsorData, IPictureService _pictureService)
        {
            if (SponsorData == null)
                return new SponsorDataModel();
            var model = new SponsorDataModel()
            {
                Id = SponsorData.Id,
                BattleType = SponsorData.BattleType,
                BattleId = SponsorData.BattleId,
                SponsorCustomerId = SponsorData.SponsorCustomerId,
                PictureId = SponsorData.PictureId,
                DisplayName = SponsorData.DisplayName,
                TargetUrl = SponsorData.TargetUrl,
                DisplayOrder = SponsorData.DisplayOrder
            };
            if (SponsorData.PictureId > 0)
                model.PictureUrl = _pictureService.GetPictureUrl(model.PictureId);

            return model;
        }
    }
}