using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerCommentController : BasePublicController
    {
      public ActionResult CustomerComments()
        {
            return View("mobSocial/CustomerComments/CustomerComments");
        }
    }
}
