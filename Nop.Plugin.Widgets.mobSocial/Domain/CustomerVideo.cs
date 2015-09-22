using System;
using Nop.Core;
using System.Web.Script.Serialization;
using Mob.Core.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerVideo : BaseMobEntity
    {
        public int CustomerVideoAlbumId { get; set; }
        public string VideoUrl { get; set; }
        public string Caption { get; set; }
        public int DisplayOrder { get; set; }
        public int LikeCount { get; set; }


        [ScriptIgnore]
        public virtual CustomerVideoAlbum VideoAlbum { get; set; }

        
    }


}