using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    //todo: make into social network plugin and design social network plugin API
    public class TeamPageMap : BaseMobEntityTypeConfiguration<TeamPage>
    {

        public TeamPageMap()
        {
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
