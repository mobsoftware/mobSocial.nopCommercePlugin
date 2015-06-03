using Nop.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class ArtistPageManager : BaseEntity
    {
        public int CustomerId { get; set; }
        public int ArtistPageId { get; set; }

        [ForeignKey("ArtistPageId")]
        public virtual ArtistPage ArtistPage { get; set; }
    }
}
