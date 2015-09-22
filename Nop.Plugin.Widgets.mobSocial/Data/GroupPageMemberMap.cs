using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class GroupPageMemberMap : BaseMobEntityTypeConfiguration<GroupPageMember>
    {

        public GroupPageMemberMap()
        {
            //Map the additional properties
            HasRequired(m => m.GroupPage);

            Property(m => m.CustomerId);


            Property(m => m.DisplayOrder);

            
           


        }

    }
}
