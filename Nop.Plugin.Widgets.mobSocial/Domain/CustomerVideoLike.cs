using System;
using Mob.Core.Domain;
using Nop.Core;
using Nop.Core.Domain.Customers;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerVideoLike : BaseMobEntity
    {
        public int CustomerId { get; set; }
        public int CustomerVideoId { get; set; }

        
    }


}