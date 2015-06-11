using Mob.Core;
using Nop.Core;
using Nop.Core.Domain.Seo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class ArtistPage : BaseEntity, ISlugSupported, INameSupported
    {
        public int PageOwnerId { get; set; }
        public string Name { get; set; }
        public string RemoteEntityId { get; set; }
        public string RemoteSourceName { get; set; }
        public string Biography { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string HomeTown { get; set; }
        public string ShortDescription { get; set; }

        public virtual IList<ArtistPageManager> PageManagers { get; set; }
        public virtual IList<ArtistPagePicture> Pictures { get; set; }
        public virtual IList<Song> Songs { get; set; }
    }
}
