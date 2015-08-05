using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VideoBattlePictureMap  : EntityTypeConfiguration<VideoBattlePicture>
    {
        public VideoBattlePictureMap()
        {
            ToTable("VideoBattlePicture");

            //Map the primary key
            HasKey(m => m.Id);

            Property(m => m.PictureId);
            Property(m => m.DisplayOrder);
            Property(m => m.VideoBattleId);
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();
        }
    }
}
