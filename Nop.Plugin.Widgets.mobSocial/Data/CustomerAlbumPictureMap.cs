using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerAlbumPictureMap : BaseMobEntityTypeConfiguration<CustomerAlbumPicture>
    {

        public CustomerAlbumPictureMap()
        {

            //Map the additional properties
            Property(m => m.CustomerAlbumId);
            Property(m => m.Url);
            Property(m => m.ThumbnailUrl);
            Property(m => m.Caption);
            Property(m => m.DisplayOrder);
            Property(m => m.LikeCount);


        }

    }
}
