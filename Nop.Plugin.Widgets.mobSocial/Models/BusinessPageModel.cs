using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using Nop.Web.Framework.Localization;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class BusinessPageModel : BasePageModel
    {

        public BusinessPageModel()
        {
            AddCouponModel = new BusinessPageCouponModel();
            Coupons = new List<BusinessPageCouponModel>();
            Pictures = new List<PictureModel>();
        }
        
        public List<BusinessPageCouponModel> Coupons { get; set; }
        public BusinessPageCouponModel AddCouponModel { get; set; }


        public bool CanEdit { get; set; }
    }

   

    
}