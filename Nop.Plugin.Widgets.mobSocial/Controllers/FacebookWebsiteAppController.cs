using System.Web.Mvc;
using Nop.Web.Framework.Security;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class FacebookWebsiteAppController : MobSocialWidgetBaseController
    {
        public ActionResult Index()
        {
            return View("mobSocial/FacebookWebsiteApp/Index");
        }

    }

}
