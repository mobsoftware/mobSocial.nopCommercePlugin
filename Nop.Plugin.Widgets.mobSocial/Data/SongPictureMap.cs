using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Data;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class SongPictureMap : BaseMobEntityTypeConfiguration<SongPicture>
    {
        public SongPictureMap()
        {

            Property(m => m.PictureId);
            Property(m => m.DisplayOrder);
            Property(m => m.EntityId).HasColumnName("SongId"); //backward compatibility

        }
       
            
    }
}
