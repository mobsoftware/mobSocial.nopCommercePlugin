using System.Web.Mvc;
using Nop.Web.Controllers;
using Nop.Plugin.Widgets.MobSocial.Core;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public partial class MusicController : BasePublicController
    {
        #region Fields
        private IMusicService _musicService;
        #endregion

        #region Constructors

        public MusicController(IMusicService musicService)
        {
            _musicService = musicService;
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
