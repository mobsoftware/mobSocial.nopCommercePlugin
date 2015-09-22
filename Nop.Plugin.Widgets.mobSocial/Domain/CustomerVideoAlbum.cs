using System;
using System.Collections.Generic;
using Mob.Core.Domain;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerVideoAlbum : BaseMobEntity
    {
        public virtual int CustomerId { get; set; }
        public virtual string Name { get; set; }
        public virtual int DisplayOrder { get; set; }
        /// <summary>
        /// The main video album photos appear in the Videos tab
        /// </summary>
        public virtual bool IsMainVideoAlbum { get; set; }



        public virtual List<CustomerVideo> Videos { get; set; }
        
    }


}