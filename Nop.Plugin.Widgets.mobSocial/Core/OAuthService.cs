using System;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;
using System.Drawing;
using System.Linq;
using Nop.Services.Seo;
using Nop.Core.Domain.Seo;
using System.Collections.Generic;


namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class OAuthService : IOAuthService
    {
        public string Uri { get; set; }
        public string SecureUri { get; set; }
        public string ConsumerKey { get; set; }
        public string ConsumerSecret { get; set; }

        public OAuthService(IApiUri apiUri, IOAuthCredentials credentials)
        {
            Uri = apiUri.Uri;
            SecureUri = apiUri.SecureUri;
            ConsumerKey = credentials.ConsumerKey;
            ConsumerSecret = credentials.ConsumerSecret;
        }

        
    }

}
