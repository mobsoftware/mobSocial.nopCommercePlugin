using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class BusinessPageCouponService : BaseEntityService<BusinessPageCoupon>,
        IBusinessPageCouponService
    {

        public BusinessPageCouponService(IMobRepository<BusinessPageCoupon> repository,
            IWorkContext workContext) : base(repository)
        {
        }

        public List<BusinessPageCoupon> GetAll(int businessPageId)
        {
            return base.Repository.Table
                .Where(x => x.BusinessPageId == businessPageId)
                .ToList();
        }
      
        public override List<BusinessPageCoupon> GetAll(string Term, int Count = 15, int Page = 1)
        {
            // TODO: Later make a stored procedure.
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(Term.ToLower()))
                .Skip((Page - 1) * Count)
                .Take(Count)
                .ToList();
        }
    }

}
