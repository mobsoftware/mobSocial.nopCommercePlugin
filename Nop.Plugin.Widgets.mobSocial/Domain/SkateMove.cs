using System.Collections.Generic;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    //todo Make this into a Social Network plugin - leggeb02
    public class SkateMove : BaseEntity
    {

        public string Name { get; set; }
        public string BadgeImageUrl { get; set; }
        public string Description { get; set; }

        public int SkatingTypeId { get; set; }

        public SkatingType SkatingType { get; set; }
            

    }
    

    public enum SkatingType
    {
        Jamskating,
        RollerDerby,
        SpeedSkating,
        Skateboarding,
        Iceskating
    }


}



