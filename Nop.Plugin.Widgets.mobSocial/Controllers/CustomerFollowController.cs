using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerFollowController : BasePublicController
    {
        public ActionResult CustomerFollowButton()
        {
            return View("mobSocial/CustomerFollow/CustomerFollowButton");
        }


      
    }
}