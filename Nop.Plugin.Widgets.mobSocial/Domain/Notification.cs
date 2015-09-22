using System.Collections.Generic;
using Nop.Core;
using System;
using Mob.Core.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{

    public class Notification : BaseMobEntity
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



