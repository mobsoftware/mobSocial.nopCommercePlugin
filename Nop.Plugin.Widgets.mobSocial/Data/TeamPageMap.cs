using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    //todo: make into social network plugin and design social network plugin API
    public class TeamPageMap : EntityTypeConfiguration<TeamPage>
    {

        public TeamPageMap()
        {
            ToTable("TeamPage");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            HasMany(m => m.GroupPages);
            Property(m => m.Name);
            Property(m => m.Description);
            Property(m => m.TeamPictureUrl);
            Property(m => m.CreatedOn).HasColumnType("datetime2");
            Property(m => m.CreatedBy);
            Property(m => m.UpdatedOn).HasColumnType("datetime2");
            Property(m => m.UpdatedBy);
            
        }

    }
}
