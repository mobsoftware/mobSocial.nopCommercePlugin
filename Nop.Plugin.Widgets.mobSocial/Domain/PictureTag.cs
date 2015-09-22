using System;
using Mob.Core.Domain;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class PictureTag : BaseMobEntity
    {
        public int PictureId { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int CustomerId { get; set; }
        public int TaggedByCustomerId { get; set; }

    }

}