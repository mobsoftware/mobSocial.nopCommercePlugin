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
    public class MusicApiUri : IApiUri
    {
        public string Uri
        {
            get { return "http://api.7digital.com/1.2"; }
        }

        public string SecureUri
        {
            get { return "https://api.7digital.com/1.2"; }
        }
    }

}
