using System.Web;
using mobSocial.Core.Infrastructure.AppEngine;

namespace Nop.MobSocial.WebApi
{
    public class WebApiHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            mobSocialEngine.ActiveEngine.Start();
        }

        public void Dispose()
        {
            //do nothing
        }
    }
}