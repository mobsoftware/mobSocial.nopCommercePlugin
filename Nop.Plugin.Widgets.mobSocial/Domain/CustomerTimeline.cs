using System;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerTimeline : BaseEntity
    {
        public int CustomerId { get; set; }
        public string StatusText { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

    }

}