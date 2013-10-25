using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerSkateMoveMap : EntityTypeConfiguration<CustomerSkateMove>
    {

        public CustomerSkateMoveMap()
        {
            ToTable("CustomerSkateMove");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerId);

            HasRequired(m => m.SkateMove);

            Property(m => m.CustomerSkateMoveProofUrl);
            Property(m => m.DateAdded).HasColumnType("datetime2");
            



        }

    }
}
