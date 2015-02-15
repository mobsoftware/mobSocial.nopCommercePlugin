using System;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;
using System.Drawing;
using System.Linq;
using Nop.Services.Seo;
using Nop.Core.Domain.Seo;
using System.Collections.Generic;


namespace Nop.Plugin.Widgets.MobSocial.Core
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

        public override BusinessPageCoupon GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();

        }

    }

}
