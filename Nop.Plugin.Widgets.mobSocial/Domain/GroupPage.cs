using System.Collections.Generic;
using Mob.Core.Domain;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{

    public class GroupPage : BaseMobEntity
    {

        public GroupPage()
        {
            Members = new List<GroupPageMember>();
        }

        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

        public virtual string PayPalDonateUrl { get; set; }

        public virtual List<GroupPageMember> Members { get; set; }

        public virtual TeamPage Team { get; set; }

        /// <summary>
        /// Display order of this group on the Team Page
        /// </summary>
        public virtual int DisplayOrder { get; set; }

    }

}



