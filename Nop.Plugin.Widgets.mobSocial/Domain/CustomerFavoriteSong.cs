using System;
using Nop.Core;
using Mob.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerFavoriteSong : BaseEntity, ISortableSupported
    {
        public int CustomerId { get; set; }
        public int TrackId { get; set; }
        public string Title { get; set; }
        public string ArtistId { get; set; }
        public string ArtistName { get; set; }
        public string PreviewUrl { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

    }

}




