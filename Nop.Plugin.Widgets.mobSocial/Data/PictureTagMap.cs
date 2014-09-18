using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class PictureTagMap : EntityTypeConfiguration<PictureTag>
    {

        public PictureTagMap()
        {
            ToTable("PictureTag");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.PictureId);
            Property(m => m.PositionX);
            Property(m => m.PositionY);
            Property(m => m.CustomerId);
            Property(m => m.TaggedByCustomerId);
    
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2");

        }

    }
}
