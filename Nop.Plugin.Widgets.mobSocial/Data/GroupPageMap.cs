using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class GroupPageMap : EntityTypeConfiguration<GroupPage>
    {

        public GroupPageMap()
        {
            ToTable("GroupPage");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.Description);

            Property(m => m.PayPalDonateUrl);

            HasMany(m => m.Members);

            HasOptional(m => m.Team);








        }

    }
}
