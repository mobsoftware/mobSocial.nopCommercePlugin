using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface IApiUri
    {
         string Uri { get; }
         string SecureUri { get; }
    }
}
