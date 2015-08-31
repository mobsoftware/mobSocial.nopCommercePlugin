using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Nop.Plugin.Widgets.MobSocial.OwinStartup))]

namespace Nop.Plugin.Widgets.MobSocial
{
    public class OwinStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
