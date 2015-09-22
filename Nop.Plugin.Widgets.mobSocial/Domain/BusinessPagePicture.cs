using Nop.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mob.Core.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class BusinessPagePicture : BaseMobPictureEntity
    {
        public virtual BusinessPage BusinessPage { get; set; }

    }
}
