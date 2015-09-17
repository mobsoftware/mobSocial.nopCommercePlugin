using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class BusinessPageCouponService : BaseService<BusinessPageCoupon, BusinessPageCoupon>,
        IBusinessPageCouponService
    {

        public BusinessPageCouponService(IRepository<BusinessPageCoupon> repository,
            IWorkContext workContext) : base(repository, workContext)
        {
        }

        public List<BusinessPageCoupon> GetAll(int businessPageId)
        {
            return base.Repository.Table
                .Where(x => x.BusinessPageId == businessPageId)
                .ToList();
        }

        public override List<BusinessPageCoupon> GetAll(string term, int count)
        {
            // TODO: Later make a stored procedure.
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();

        }

        public override List<BusinessPageCoupon> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override BusinessPageCoupon GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();

        }


        public override Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }

}
