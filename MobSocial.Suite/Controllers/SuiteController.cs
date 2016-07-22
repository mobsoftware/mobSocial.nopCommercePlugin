using System.Web.Mvc;
using Nop.Web.Controllers;

namespace MobSocial.Suite.Controllers
{
    public class SuiteController : BasePublicController
    {
        public ActionResult Configure()
        {
            return View();
        }
    }
}
