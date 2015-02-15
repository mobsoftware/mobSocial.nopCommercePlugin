using Nop.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class BusinessPageCoupon : BaseEntity
    {
        public int BusinessPageId { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string BriefDescription { get; set; }
        public string Disclaimer { get; set; }
        public int UsageCount { get; set; }
        public int DisplayOrder { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public virtual BusinessPage BusinessPage { get; set; }
    }
}
