using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using Nop.Web.Framework.Localization;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class AddPictureModel : BaseNopModel
    {
        [UIHint("Picture")]
        public int PictureId { get; set; }

        //[NopResourceDisplayName("Admin.Catalog.Products.Pictures.Fields.Picture")]
        public string PictureUrl { get; set; }

        //[NopResourceDisplayName("Admin.Catalog.Products.Pictures.Fields.DisplayOrder")]
        public int DisplayOrder { get; set; }


        public int EntityId { get; set; }

        public string EntityName { get; set; }
    }
}