using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerAlbumModel : BaseNopModel
    {

        public CustomerAlbumModel()
        {
            Pictures = new List<CustomerAlbumPictureModel>();
        }

        public int AlbumId { get; set; } 
        public string AlbumName { get; set; }

        public List<CustomerAlbumPictureModel> Pictures { get; set; }

    }
}


