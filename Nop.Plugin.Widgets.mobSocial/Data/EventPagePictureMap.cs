using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class EventPagePictureMap : EntityTypeConfiguration<EventPagePicture>
    {

        public EventPagePictureMap()
        {
            ToTable("EventPagePicture");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            this.HasRequired(m => m.EventPage)
                .WithMany(m => m.Pictures)
                .HasForeignKey(m => m.PictureId);

            Property(m => m.DisplayOrder);
            
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();
            
        }

    }
}
