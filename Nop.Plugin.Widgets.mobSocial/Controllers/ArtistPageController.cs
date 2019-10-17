using Nop.Core;
using Nop.Web.Framework.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nop.Web.Framework.Mvc.Filters;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [HttpsRequirement(SslRequirement.No)]
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
        public IActionResult Index(int Id)
        {
            return View("mobSocial/ArtistPage/Index");
        }
        
        public IActionResult Search()
        {
            return View("mobSocial/ArtistPage/Search"); 
        }

     
        /// <summary>
        /// Returns artists pages for logged in user
        /// </summary>
        [Authorize]
        public IActionResult MyArtistPages()
        {
            return View("mobSocial/ArtistPage/MyPages");
        }
        
        /// <summary>
        /// Loads the artist editor page
        /// </summary>
        [Authorize]
        public IActionResult Editor(int artistPageId = 0)
        {
            return View("mobSocial/ArtistPage/Editor", null);

        }

       
        #endregion
    }
}
