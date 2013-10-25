using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerFriendMap : EntityTypeConfiguration<CustomerFriend>
    {

        public CustomerFriendMap()
        {
            ToTable("CustomerFriend");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.FromCustomerId);

            Property(m => m.ToCustomerId);
            Property(m => m.Confirmed);
            Property(m => m.DateRequested).HasColumnType("datetime2");
            Property(m => m.DateConfirmed).HasColumnType("datetime2").IsOptional();



        }

    }
}
