using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerFavoriteSongMap : EntityTypeConfiguration<CustomerFavoriteSong>
    {

        public CustomerFavoriteSongMap()
        {
            ToTable("CustomerFavoriteSong");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.TrackId);
            Property(m => m.Title);
            Property(m => m.PreviewUrl);
            Property(m => m.DisplayOrder);
            Property(m => m.IsDeleted);
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2");


        }

    }
}
