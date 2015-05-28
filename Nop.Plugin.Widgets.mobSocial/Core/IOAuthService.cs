using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface IOAuthService
    {
        string Uri { get; set; }
        string SecureUri { get; set; }
        string ConsumerKey { get; set; }
        string ConsumerSecret { get; set; }
    }
}
