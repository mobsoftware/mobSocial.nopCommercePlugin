using System;
using Nop.Core;
using System.Web.Script.Serialization;


namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerAlbumPicture : BaseEntity
    {
        public int CustomerAlbumId { get; set; }
        public string Url { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Caption { get; set; }
        public int DisplayOrder { get; set; }
        public int LikeCount { get; set; }

        public virtual DateTime DateCreated { get; set; }
        public virtual DateTime? DateUpdated { get; set; }

        [ScriptIgnore]
        public virtual CustomerAlbum Album { get; set; }

        
    }


}