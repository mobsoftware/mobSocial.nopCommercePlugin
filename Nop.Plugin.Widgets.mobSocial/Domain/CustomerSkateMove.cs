using System;
using System.Collections.Generic;
using System.Data.Spatial;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    
    public class CustomerSkateMove : BaseEntity
    {

        public virtual int CustomerId { get; set; }
        
        /// <summary>
        /// Url the customer supplies to prove that he or she can perform the move.
        /// </summary>
        public virtual string CustomerSkateMoveProofUrl { get; set; }

        public virtual DateTime DateAdded { get; set; }

        public virtual SkateMove SkateMove { get; set; }
    }



}



