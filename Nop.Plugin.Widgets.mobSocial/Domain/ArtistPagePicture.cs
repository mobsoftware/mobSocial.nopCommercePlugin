using Nop.Core;
using Nop.Core.Domain.Media;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class ArtistPagePicture : BaseMobPictureEntity
    {
        public virtual ArtistPage Artist { get; set; }


    }
}
