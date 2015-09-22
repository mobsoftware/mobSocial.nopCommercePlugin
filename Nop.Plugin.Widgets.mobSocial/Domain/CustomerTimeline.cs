using System;
using Mob.Core.Domain;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerTimeline : BaseMobEntity
    {
        public int CustomerId { get; set; }
        public string StatusText { get; set; }
        public int? PictureId { get; set; }

    }

}