using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using Nop.Core.Data;
using System.Linq;
using Nop.Core;
using System;
using Nop.Services.Seo;
using Nop.Core.Domain.Seo;
using Mob.Core;
using Nop.Core.Domain.Media;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class MusicApiCredentials : IOAuthCredentials
    {
        public MusicApiCredentials()
        {
            ConsumerKey = "7d27r8wn855r";
            ConsumerSecret = "rvudkp74mgwkty3y";
        }

        public string ConsumerKey { get; set; }
        public string ConsumerSecret { get; set; }
    }

}
