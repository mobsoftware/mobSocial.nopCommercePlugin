using System;
using System.Data.Spatial;
using System.Web.Script.Serialization;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerVideo : BaseEntity
    {
        public int CustomerVideoAlbumId { get; set; }
        public string VideoUrl { get; set; }
        public string Caption { get; set; }
        public int DisplayOrder { get; set; }
        public int LikeCount { get; set; }

        public virtual DateTime DateCreated { get; set; }
        public virtual DateTime? DateUpdated { get; set; }

        [ScriptIgnore]
        public virtual CustomerVideoAlbum VideoAlbum { get; set; }

        
    }


}