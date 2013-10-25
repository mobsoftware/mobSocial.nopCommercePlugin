using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class GroupPageMemberMap : EntityTypeConfiguration<GroupPageMember>
    {

        public GroupPageMemberMap()
        {
            ToTable("GroupPageMember");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            HasRequired(m => m.GroupPage);

            Property(m => m.CustomerId);

            
           


        }

    }
}
