using System.Collections.Generic;
using Nop.Core;
using System;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{

    public class Notification : BaseEntity
    {

        public Notification()
        {

        }

        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public virtual string Name { get; set; }
        public virtual DateTime CreatedOn { get; set; }
        public virtual DateTime LastSent { get; set; }
        public virtual int Attempts { get; set; }
    }

}



