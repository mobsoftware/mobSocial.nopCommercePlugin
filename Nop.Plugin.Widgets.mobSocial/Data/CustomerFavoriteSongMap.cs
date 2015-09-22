using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerFavoriteSongMap : BaseMobEntityTypeConfiguration<CustomerFavoriteSong>
    {

        public CustomerFavoriteSongMap()
        {
            //Map the additional properties
            Property(m => m.TrackId);
            Property(m => m.Title);
            Property(m => m.PreviewUrl);
            Property(m => m.DisplayOrder);
            Property(m => m.IsDeleted);

        }

    }
}
