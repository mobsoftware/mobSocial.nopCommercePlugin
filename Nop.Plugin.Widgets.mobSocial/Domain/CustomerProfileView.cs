using System;
using Nop.Core;
using Nop.Core.Domain.Customers;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerProfileView : BaseEntity
    {
        public int CustomerId { get; set; }
        public int ViewerCustomerId { get; set; }
        public int Views { get; set; }

        public virtual DateTime DateCreated { get; set; }
        public virtual DateTime DateUpdated { get; set; }

        
    }


}