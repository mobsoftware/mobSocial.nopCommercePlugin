using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Web.Controllers;
using Nop.Web.Framework.Security;
using System.Web.Mvc;
using mobSocial.Data.Entity.ArtistPages;
using mobSocial.Services.ArtistPages;
using mobSocial.WebApi.Models.ArtistPages;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class ArtistPageController : MobSocialWidgetBaseController
    {
        #region variables
        private readonly IArtistPageService _artistPageService;
        private readonly IWorkContext _workContext;
        private readonly IArtistPageApiService _artistPageApiService;
        private readonly IArtistPageManagerService _artistPageManagerService;

        public ArtistPageController(IArtistPageService artistPageService, IWorkContext workContext, IArtistPageApiService artistPageApiService, IArtistPageManagerService artistPageManagerService)
        {
            _artistPageService = artistPageService;
            _workContext = workContext;
            _artistPageApiService = artistPageApiService;
            _artistPageManagerService = artistPageManagerService;
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
        public ActionResult Editor(int ArtistPageId = 0)
        {
            ArtistPageModel model = null;
            if (ArtistPageId != 0)
            {
                var artist = _artistPageService.Get(ArtistPageId);
                //can the current user edit this page?
                if (CanEdit(artist))
                {
                    model = new ArtistPageModel() {
                        Description = artist.Biography,
                        DateOfBirth = artist.DateOfBirth,
                        Gender = artist.Gender,
                        Name = artist.Name,
                        ShortDescription = artist.ShortDescription,
                        RemoteEntityId = artist.RemoteEntityId,
                        RemoteSourceName = artist.RemoteSourceName,
                        HomeTown = artist.HomeTown
                    };

                }
                else
                {
                    return InvokeHttp404();
                }

            }
            else
            {
                model = new ArtistPageModel();
            }

            return View("mobSocial/ArtistPage/Editor", model);

        }

       
        #endregion



        #region functions


        /// <summary>
        /// Checks if current logged in user can actually edit the page
        /// </summary>
        /// <returns>True if editing is allowed. False otherwise</returns>
        [NonAction]
        bool CanEdit(ArtistPage ArtistPage)
        {
            if (ArtistPage == null)
                return false;
            return _workContext.CurrentCustomer.Id == ArtistPage.PageOwnerId //page owner
                || _workContext.CurrentCustomer.IsAdmin() //administrator
                || _artistPageManagerService.IsPageManager(ArtistPage.Id, _workContext.CurrentCustomer.Id); //page manager
        }

      
       #endregion


    }
}
