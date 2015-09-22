using System;
using Mob.Core.Domain;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerProfile : BaseMobEntity
    {
        public int CustomerId { get; set; }
        public string AboutMe { get; set; }
        public string Website { get; set; }

    }

}
