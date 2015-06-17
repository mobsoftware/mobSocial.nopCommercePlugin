using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SongModel : BasePageModel
    {
        public SongModel()
        {

        }
        public string TrackId { get; set; }
        public string RemoteSourceName { get; set; }
        public string RemoteEntityId { get; set; }
        public string AffiliateUrl { get; set; }
        public string PreviewUrl { get; set; }
        public int ArtistPageId { get; set; }
        public int AssociatedProductId { get; set; }
        public decimal Price { get; set; }
        public string FormattedPrice { get; set; }
        public bool Published { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }

        
    }
}
