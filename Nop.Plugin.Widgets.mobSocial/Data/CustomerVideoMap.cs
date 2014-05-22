using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerVideoMap : EntityTypeConfiguration<CustomerVideo>
    {

        public CustomerVideoMap()
        {
            ToTable("CustomerVideo");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerVideoAlbumId);
            Property(m => m.VideoUrl);
            Property(m => m.Caption);
            Property(m => m.DisplayOrder);
            Property(m => m.LikeCount);

            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();

        }

    }
}
