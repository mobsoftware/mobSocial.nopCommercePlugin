using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerVideoLikeMap : EntityTypeConfiguration<CustomerVideoLike>
    {

        public CustomerVideoLikeMap()
        {
            ToTable("CustomerVideoLike");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.CustomerVideoId);

            Property(m => m.DateCreated).HasColumnType("datetime2");

        }

    }
}
