using Microsoft.AspNetCore.Mvc;
using Nop.Web.Framework.Mvc.Filters;
using Nop.Web.Framework.Security;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [HttpsRequirement(SslRequirement.No)]
    public partial class FacebookWebsiteAppController : MobSocialWidgetBaseController
    {
        public IActionResult Index()
        {
            return View("mobSocial/FacebookWebsiteApp/Index");
        }

    }

}
