using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Domain;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class VideoBattlePicture : BaseMobPictureEntity
    {
        public virtual VideoBattle VideoBattle { get; set; }

    }
}
