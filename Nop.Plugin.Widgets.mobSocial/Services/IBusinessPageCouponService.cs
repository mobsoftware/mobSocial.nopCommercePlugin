using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface IBusinessPageCouponService : IBaseEntityService<BusinessPageCoupon>
    {
        List<BusinessPageCoupon> GetAll(int businessPageId);
    }

}
