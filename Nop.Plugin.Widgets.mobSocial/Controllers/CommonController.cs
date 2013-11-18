using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public partial class CommonController : BaseNopController
    {
        #region Fields

      
        #endregion

        #region Constructors

        public CommonController()
        {
            
        }

        #endregion

        #region Utilities

        //page not found
        public ActionResult PageNotFound()
        {
            this.Response.StatusCode = 404;
            this.Response.TrySkipIisCustomErrors = true;

            return View();
        }

     

        #endregion

        #region Methods
        
        public ActionResult GenericUrl()
        {
            //seems that no entity was found
            return InvokeHttp404();
        }

        #endregion

    }
}
