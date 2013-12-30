using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerAlbumMap : EntityTypeConfiguration<CustomerAlbum>
    {

        public CustomerAlbumMap()
        {
            ToTable("CustomerAlbum");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.Name);
            Property(m => m.DisplayOrder);
            Property(m => m.IsMainAlbum);

            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();

           
            
        }

    }
}
