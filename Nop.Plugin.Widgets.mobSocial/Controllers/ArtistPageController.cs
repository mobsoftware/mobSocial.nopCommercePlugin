using Nop.Core;
using Nop.Web.Framework.Security;
using System.Web.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class ArtistPageController : MobSocialWidgetBaseController
    {
        #region variables
        private readonly IWorkContext _workContext;

        public ArtistPageController(IWorkContext workContext)
        {
            _workContext = workContext;
        }

        #endregion

        #region Actions
        public ActionResult Index(int Id)
        {
            return View("mobSocial/ArtistPage/Index");
        }
        
        public ActionResult Search()
        {
            return View("mobSocial/ArtistPage/Search"); 
        }

     
        /// <summary>
        /// Returns artists pages for logged in user
        /// </summary>
        [Authorize]
        public ActionResult MyArtistPages()
        {
            return View("mobSocial/ArtistPage/MyPages");
        }
        
        /// <summary>
        /// Loads the artist editor page
        /// </summary>
        [Authorize]
        public ActionResult Editor(int artistPageId = 0)
        {
            return View("mobSocial/ArtistPage/Editor", null);

        }

       
        #endregion
    }
}
