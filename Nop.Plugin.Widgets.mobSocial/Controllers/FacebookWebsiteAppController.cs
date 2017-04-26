using System.Web.Mvc;
using Nop.Web.Framework.Security;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class FacebookWebsiteAppController : BasePublicController
    {
        public ActionResult Index()
        {
            return View("mobSocial/FacebookWebsiteApp/Index");
        }

    }

}
