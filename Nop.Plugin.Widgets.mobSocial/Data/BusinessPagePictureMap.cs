using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class BusinessPagePictureMap : EntityTypeConfiguration<BusinessPagePicture>
    {

        public BusinessPagePictureMap()
        {
            ToTable("BusinessPagePicture");

            //Map the primary key
            HasKey(m => m.Id);

            Property(m => m.PictureId);
            Property(m => m.DisplayOrder);
            
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();
            
        }

    }
}
