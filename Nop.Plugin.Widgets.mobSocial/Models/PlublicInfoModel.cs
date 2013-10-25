using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class PlublicInfoModel : BaseNopModel
    {
        
        public string ProductUrl { get; set; }
        public string ProductPictureUrl { get; set; }
//        [NopResourceDisplayName("Plugins.Payment.PurchaseOrder.AdditionalFee")]
        public string Title { get; set; }

       

    }
}