using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerAlbumPictureMap : EntityTypeConfiguration<CustomerAlbumPicture>
    {

        public CustomerAlbumPictureMap()
        {
            ToTable("CustomerAlbumPicture");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerAlbumId);
            Property(m => m.Caption);
            Property(m => m.DisplayOrder);

            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();

           
            
        }

    }
}
