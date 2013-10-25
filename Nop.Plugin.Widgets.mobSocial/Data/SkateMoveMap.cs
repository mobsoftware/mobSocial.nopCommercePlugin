using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    //todo: make into social network plugin and design social network plugin API
    public class SkateMoveMap : EntityTypeConfiguration<SkateMove>
    {

        public SkateMoveMap()
        {
            ToTable("SkateMove");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.SkatingTypeId);
            Property(m => m.Name);
            Property(m => m.Description);
            Property(m => m.BadgeImageUrl);

        }

    }
}
