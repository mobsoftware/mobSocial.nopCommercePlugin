using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerLikeController : BasePublicController
    {
        public ActionResult CustomerLikeButton()
        {
            return View("mobSocial/CustomerLike/CustomerLikeButton");
        }


      
    }
}