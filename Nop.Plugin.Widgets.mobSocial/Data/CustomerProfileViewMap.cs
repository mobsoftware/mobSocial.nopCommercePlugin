using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerProfileViewMap : EntityTypeConfiguration<CustomerProfileView>
    {

        public CustomerProfileViewMap()
        {
            ToTable("CustomerProfileView");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.ViewerCustomerId);
            Property(m => m.Views);

            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2");


        }

    }
}
