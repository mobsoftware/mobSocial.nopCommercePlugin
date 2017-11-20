using System.Web.Mvc;
using Nop.Web.Framework.Security;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class BusinessPageController : MobSocialWidgetBaseController
    {
        
        public ActionResult Index(int id, int? page){
           
           return View("mobSocial/BusinessPage/Index", null);
        }

      


        [HttpGet]
        public ActionResult Search(string searchTerm = "")
        {
            return View("mobSocial/BusinessPage/Search", (object) searchTerm); 
        } 
    }
}
