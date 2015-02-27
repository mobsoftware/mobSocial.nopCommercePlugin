using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using Nop.Web.Framework.Localization;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    /// <summary>
    /// Common properties across all social network pages.
    /// </summary>
    public class BasePageModel : BaseNopEntityModel, ILocalizedModel<LocalizedModel>
    {
        #region Properties
        public string Name { get; set; }
        
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public int StateProvinceId { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipPostalCode { get; set; }
        public int CountryId { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public DateTime StartDate { get; set; }
        [UIHint("DateTimeNullable")]
        public DateTime? EndDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        [AllowHtml]
        public string Description { get; set; }

        [AllowHtml]
        public string MetaKeywords { get; set; }

        [AllowHtml]
        public string MetaDescription { get; set; }

        [AllowHtml]
        public string MetaTitle { get; set; }

        [AllowHtml]
        public string SeName { get; set; }

        public string MainPictureUrl { get; set; }

        public List<PictureModel> Pictures { get; set; }

        public IList<LocalizedModel> Locales { get; set; }


        public AddPictureModel AddPictureModel { get; set; }

        //public EventPageHotelModel AddHotelModel { get; set; }

        public string FullSizeImageUrl { get; set; }
        #endregion

        #region Constructor
        public BasePageModel()
        {
            AddPictureModel = new AddPictureModel();
            Locales = new List<LocalizedModel>();
            Pictures = new List<PictureModel>();
        }
        #endregion

       

        
    }

    public partial class LocalizedModel : ILocalizedModelLocal
    {
        public int LanguageId { get; set; }

        [AllowHtml]
        public string MetaKeywords { get; set; }

        [AllowHtml]
        public string MetaDescription { get; set; }

        [AllowHtml]
        public string MetaTitle { get; set; }

        [AllowHtml]
        public string SeName { get; set; }
    }
}