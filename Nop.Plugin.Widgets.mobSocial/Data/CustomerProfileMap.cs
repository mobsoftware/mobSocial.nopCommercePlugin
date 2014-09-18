using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerProfileMap : EntityTypeConfiguration<CustomerProfile>
    {

        public CustomerProfileMap()
        {
            ToTable("CustomerProfile");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.AboutMe);
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2");


        }

    }
}
