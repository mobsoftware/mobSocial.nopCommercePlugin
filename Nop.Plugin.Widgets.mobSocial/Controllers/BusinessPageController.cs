using Microsoft.AspNetCore.Mvc;
using Nop.Web.Framework.Mvc.Filters;
using Nop.Web.Framework.Security;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [HttpsRequirement(SslRequirement.No)]
    public partial class BusinessPageController : MobSocialWidgetBaseController
    {
        
        public IActionResult Index(int id, int? page){
           
           return View("mobSocial/BusinessPage/Index", null);
        }

      


        [HttpGet]
        public IActionResult Search(string searchTerm = "")
        {
            return View("mobSocial/BusinessPage/Search", (object) searchTerm); 
        } 
    }
}
