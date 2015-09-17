using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface IBusinessPageCouponService : IBaseService<BusinessPageCoupon, BusinessPageCoupon>
    {
        List<BusinessPageCoupon> GetAll(int businessPageId);
    }

}
