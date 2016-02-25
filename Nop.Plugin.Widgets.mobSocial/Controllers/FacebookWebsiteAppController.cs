using System.Web.Mvc;
using Nop.Web.Framework.Security;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class FacebookWebsiteAppController : BasePublicController
    {


        public FacebookWebsiteAppController()
        {
        }

        public ActionResult Index()
        {
            return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/FacebookWebsiteApp/Index.cshtml");
        }

    }

}
