using Mob.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.Plugin.WebApi.MobSocial.Domain;
using Nop.Plugin.WebApi.MobSocial.Helpers;
using Nop.Services.Customers;
using Nop.Services.Helpers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Web.Controllers;
using Nop.Web.Framework.Security;
using System;
using System.IO;
using System.Web.Mvc;
using Nop.Services.Catalog;
using Nop.Services.Orders;
using Nop.Core.Domain.Tax;
using Nop.Plugin.WebApi.MobSocial.Extensions;
using Nop.Plugin.WebApi.MobSocial.Models;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Plugin.WebApi.MobSocial;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class ArtistPageController : BasePublicController
    {
        #region variables
        private readonly ILocalizationService _localizationService;
        private readonly IPictureService _pictureService;
        private readonly ICustomerService _customerService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly CustomerSettings _customerSettings;
        private readonly MediaSettings _mediaSettings;
        private readonly IArtistPageService _artistPageService;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly IWorkContext _workContext;
        private readonly IMobSocialService _mobSocialService;
        private readonly IArtistPageAPIService _artistPageApiService;
        private readonly IArtistPageManagerService _artistPageManagerService;
        private readonly IMusicService _musicService;
        private readonly IDownloadService _downloadService;
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private readonly IStoreContext _storeContext;
        private readonly TaxSettings _taxSettings;
        private readonly ISongService _songService;
        private readonly IPriceFormatter _priceFormatter;
        private readonly IArtistPagePaymentService _artistPagePaymentService;

        public ArtistPageController(ILocalizationService localizationService,
            IPictureService pictureService,
            ICustomerService customerService,
            IDateTimeHelper dateTimeHelper,
            CustomerSettings customerSettings,
            MediaSettings mediaSettings,
            IArtistPageService artistPageService,
            IArtistPageAPIService artistPageApiService,
            IArtistPageManagerService artistPageManagerService,
            IMusicService musicService,
            mobSocialSettings mobSocialSettings,
            IMobSocialService mobSocialService,
            IWorkContext workContext,
            IDownloadService downloadService,
            IProductService productService,
            IOrderService orderService,
            IStoreContext storeContext,
            TaxSettings taxSettings,
            ISongService songService,
            IPriceFormatter priceFormatter,
            IArtistPagePaymentService artistPagePaymentService)
        {
            _localizationService = localizationService;
            _pictureService = pictureService;
            _customerService = customerService;
            _dateTimeHelper = dateTimeHelper;
            _customerSettings = customerSettings;
            _mediaSettings = mediaSettings;
            _artistPageService = artistPageService;
            _mobSocialSettings = mobSocialSettings;
            _mobSocialService = mobSocialService;
            _workContext = workContext;
            _artistPageApiService = artistPageApiService;
            _artistPageManagerService = artistPageManagerService;
            _musicService = musicService;
            _downloadService = downloadService;
            _productService = productService;
            _orderService = orderService;
            _storeContext = storeContext;
            _taxSettings = taxSettings;
            _songService = songService;
            _priceFormatter = priceFormatter;
            _artistPagePaymentService = artistPagePaymentService;
        }

        #endregion

        #region Actions
        public ActionResult Index(int Id)
        {
            return View("mobSocial/ArtistPage/Index");
        }
        /// <summary>
        /// Imports a new artist from remote api if it doesn't exist in our database
        /// </summary>
        public ActionResult RemoteArtist(string RemoteEntityId)
        {
            if (!string.IsNullOrEmpty(RemoteEntityId))
            {
                var artists = _artistPageService.GetArtistPagesByRemoteEntityId(new string[] { RemoteEntityId });
                if (artists.Count == 0)
                {
                    //we need to create a new artist now
                    var remoteArtist = _artistPageApiService.GetRemoteArtist(RemoteEntityId);
                    if (remoteArtist == null)
                        return InvokeHttp404();

                    var artist = SaveRemoteArtistToDB(remoteArtist);
                    return RedirectToRoute("ArtistPageUrl", new { SeName = artist.GetSeName(_workContext.WorkingLanguage.Id, true, false) });
                }
                else
                {
                    //the page already exists in our database. No need to create duplicate entries. Rather redirect them to the actual artist page
                    return RedirectToRoute("ArtistPageUrl", new { SeName = artists[0].GetSeName(_workContext.WorkingLanguage.Id, true, false) });
                }
            }
            //totally unknown path
            return InvokeHttp404();
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
                var artist = _artistPageService.GetById(ArtistPageId);
                //can the current user edit this page?
                if (CanEdit(artist))
                {
                    model = new ArtistPageModel() {
                        Description = artist.Biography,
                        DateOfBirth = artist.DateOfBirth,
                        City = artist.HomeTown,
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

      
        [NonAction]
        ArtistPage SaveRemoteArtistToDB(string artistJson)
        {
            if (string.IsNullOrEmpty(artistJson))
                return null;
            
            var artist = (JObject)JsonConvert.DeserializeObject(artistJson);
            ArtistPage artistPage = new ArtistPage() {
                PageOwnerId = _workContext.CurrentCustomer.IsAdmin() ? _workContext.CurrentCustomer.Id : 0,
                Biography = artist["Description"].ToString(),
                Name = artist["Name"].ToString(),
                Gender = artist["Gender"].ToString(),
                HomeTown = artist["HomeTown"].ToString(),
                RemoteEntityId = artist["RemoteEntityId"].ToString(),
                RemoteSourceName = artist["RemoteSourceName"].ToString(),
                ShortDescription = "",
            };

            _artistPageService.Insert(artistPage);

            //we can now download the image from the server and store it on our own server
            //use the json we retrieved earlier

            if (!string.IsNullOrEmpty(artist["ImageUrl"].ToString()))
            {
                var imageUrl = artist["ImageUrl"].ToString();
                var imageBytes = HttpHelper.ExecuteGET(imageUrl);
                if (imageBytes != null)
                {
                    var fileExtension = Path.GetExtension(imageUrl);
                    if (!String.IsNullOrEmpty(fileExtension))
                        fileExtension = fileExtension.ToLowerInvariant();

                    var contentType = PictureUtility.GetContentType(fileExtension);

                    var picture = _pictureService.InsertPicture(imageBytes, contentType, artistPage.GetSeName(_workContext.WorkingLanguage.Id, true, false));
                    var artistPicture = new ArtistPagePicture() {
                        EntityId = artistPage.Id,
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        DisplayOrder = 1,
                        PictureId = picture.Id
                    };
                    _artistPageService.InsertPicture(artistPicture);
                }
               
            }
            return artistPage;
        }

        #endregion


    }
}
