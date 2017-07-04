using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerLikeController : MobSocialWidgetBaseController
    {
        public ActionResult CustomerLikeButton()
        {
            return View("mobSocial/CustomerLike/CustomerLikeButton");
        }


      
    }
}