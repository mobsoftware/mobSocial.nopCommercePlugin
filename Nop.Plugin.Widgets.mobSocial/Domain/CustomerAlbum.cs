using System;
using System.Collections.Generic;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerAlbum : BaseEntity
    {
        public virtual int CustomerId { get; set; }
        public virtual string Name { get; set; }
        public virtual int DisplayOrder { get; set; }
        /// <summary>
        /// The main album photos appear in the Pictures tab
        /// </summary>
        public virtual bool IsMainAlbum { get; set; }

        public virtual DateTime DateCreated { get; set; }
        public virtual DateTime? DateUpdated { get; set; }


        public virtual List<CustomerAlbumPicture> Pictures { get; set; }
        
    }


}