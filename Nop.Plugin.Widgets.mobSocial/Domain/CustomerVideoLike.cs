using System;
using Nop.Core;
using Nop.Core.Domain.Customers;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerVideoLike : BaseEntity
    {
        public int CustomerId { get; set; }
        public int CustomerVideoId { get; set; }

        public virtual DateTime DateCreated { get; set; }

        
    }


}