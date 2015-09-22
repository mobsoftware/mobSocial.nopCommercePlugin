using Mob.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Customers;
using Nop.Services.Helpers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Common;
using Nop.Web.Controllers;
using Nop.Web.Framework.Mvc;
using Nop.Web.Framework.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web;
using Nop.Services.Catalog;
using Nop.Services.Orders;
using Nop.Core.Domain.Payments;
using Nop.Core.Domain.Tax;
using Nop.Plugin.Widgets.MobSocial.Extensions;
using Nop.Plugin.Widgets.MobSocial.Services;

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
            var artist = _artistPageService.GetById(Id);

            if (artist == null)
                return InvokeHttp404(); //not found
           
            var model = new ArtistPageModel() {
                Description = artist.Biography,
                DateOfBirth = artist.DateOfBirth,
                City = artist.HomeTown,
                Gender = artist.Gender,
                Name = artist.Name,
                ShortDescription = artist.ShortDescription,
                HomeTown = artist.HomeTown,
                RemoteEntityId = artist.RemoteEntityId,
                RemoteSourceName = artist.RemoteSourceName,
                Id = artist.Id
            };

            //images for artist
            foreach (var picture in artist.Pictures)
            {
                model.Pictures.Add(new PictureModel {
                    Id = picture.Id,
                    EntityId = artist.Id,
                    PictureId = picture.PictureId,
                    DisplayOrder = picture.DisplayOrder,
                    DateCreated = picture.DateCreated,
                    DateUpdated = picture.DateUpdated,
                    PictureUrl = _pictureService.GetPictureUrl(picture.PictureId, 0 , true),
                });
            }
            if (model.Pictures.Count > 0)
                model.MainPictureUrl = model.Pictures[0].PictureUrl;
            else
                model.MainPictureUrl = _pictureService.GetDefaultPictureUrl();

            model.CanEdit = CanEdit(artist);
            model.CanDelete = CanDelete(artist);

            return View(ControllerUtil.MobSocialViewsFolder + "/ArtistPage/Index.cshtml", model);
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

        [HttpPost]
        public ActionResult GetRelatedArtists(int ArtistId)
        {
            var artistPage = _artistPageService.GetById(ArtistId);
            var model = new List<object>();
            if (artistPage == null || string.IsNullOrEmpty(artistPage.RemoteEntityId)) //if it's not a remote artist means some user has created it. so no related artists
                return Json(model);

            var relatedArtistsRemoteCollection = _artistPageApiService.GetRelatedArtists(artistPage.RemoteEntityId);
            if (relatedArtistsRemoteCollection == null)
                return Json(model);
            

            //get all the remote entity ids from the remote collection. We'll see those ids in our database to find matches
            //we'll deserialize the list to get the object items
            var relatedArtistDeserialized = new List<JObject>();
            foreach (var rarcItem in relatedArtistsRemoteCollection)
            {
                relatedArtistDeserialized.Add((JObject)JsonConvert.DeserializeObject(rarcItem));
            }
            //get the entity ids
            var relatedArtistsRemoteEntityIds = relatedArtistDeserialized.Select(x => x["RemoteEntityId"].ToString());

            //get all the related artists which we already have in our database
            var relatedArtistsInDB = _artistPageService.GetArtistPagesByRemoteEntityId(relatedArtistsRemoteEntityIds.ToArray());

            var relatedArtistsInDBIds = relatedArtistsInDB.Select(m => m.RemoteEntityId).ToList();

            //lets now find the ones which we don't have in our database. we'll save them by importing
            var relatedArtistsToBeImportedIds = relatedArtistsRemoteEntityIds.Except(relatedArtistsInDBIds).ToList();

            foreach (var reid in relatedArtistsToBeImportedIds)
            {
                var artistJson = relatedArtistDeserialized.Where(x => x["RemoteEntityId"].ToString() == reid).First().ToString();
                ArtistPage relatedartistPage = SaveRemoteArtistToDB(artistJson);
                relatedArtistsInDB.Add(relatedartistPage); //add new page to list of db pages

            }

            foreach (var ra in relatedArtistsInDB)
            {
                var imageUrl = "";
                if (ra.Pictures != null && ra.Pictures.Count > 0)
                    imageUrl = _pictureService.GetPictureUrl(ra.Pictures.First().PictureId, _mobSocialSettings.ArtistPageThumbnailSize);

                model.Add(new {
                    Name = ra.Name,
                    Id = ra.Id,
                    ImageUrl = imageUrl,
                    ShortDescription = ra.ShortDescription,
                    SeName = ra.GetSeName(_workContext.WorkingLanguage.Id, true, false),
                    RemoteArtist = false
                });
            }

            return Json(model);
        }

        [HttpPost]
        public ActionResult GetArtistSongs(string ArtistName)
        {
            if (string.IsNullOrEmpty(ArtistName))
                return null;

            var model = new List<object>();
            //get songs from remote server
            var songs = _artistPageApiService.GetArtistSongs(ArtistName);
            if(songs == null)
                return Json(model);
            
            foreach (string songJson in songs)
            {
                var song = (JObject)JsonConvert.DeserializeObject(songJson);
                int iTrackId;
                string previewUrl = "";
                string affiliateUrl = "";

                if (int.TryParse(song["TrackId"].ToString(), out iTrackId))
                {
                    previewUrl = _musicService.GetTrackPreviewUrl(iTrackId);
                    affiliateUrl = _musicService.GetTrackAffiliateUrl(iTrackId);
                }

                model.Add(new {
                    Id = song["RemoteEntityId"].ToString(),
                    Name = song["Name"].ToString(),
                    SeName = song["RemoteEntityId"].ToString(),
                    ImageUrl = song["ImageUrl"].ToString(),
                    PreviewUrl = previewUrl,
                    ForeignId = song["ForeignId"].ToString(),
                    TrackId = song["TrackId"].ToString(),
                    AffiliateUrl = affiliateUrl,
                    RemoteSong = true
                });
            }
            return Json(model);

        }
        [HttpPost]
        public ActionResult GetArtistSongsByArtistPage(int ArtistPageId)
        {
            //check if artist page exists
            var artistPage = _artistPageService.GetById(ArtistPageId);
            if (artistPage == null)
                return null;
            var model = new List<object>();
            foreach (var song in artistPage.Songs)
            {
                var product = _productService.GetProductById(song.AssociatedProductId);
                if (product == null) //no associated product. may be a remote artist..what say?
                    continue;

                var download = _downloadService.GetDownloadById(product.SampleDownloadId);
                model.Add(new
                {
                    Id = song.Id,
                    Name = song.Name,
                    SeName = song.GetSeName(_workContext.WorkingLanguage.Id, true, false),
                    ImageUrl = song.Pictures.Count > 0 ? _pictureService.GetPictureUrl(song.Pictures.First().PictureId) : _pictureService.GetDefaultPictureUrl(),
                    PreviewUrl = song.PreviewUrl,
                    TrackId = song.Id,
                    DownloadId = download == null ? 0 : download.Id,
                    AssociatedProductId = product.Id,
                    RemoteSong = false
                });
            }
            return Json(model);

        }
        [HttpPost]
        public ActionResult GetArtistSongPreviewUrl(string TrackId)
        {
            int iTrackId;
            if (int.TryParse(TrackId, out iTrackId))
            {
                var previewUrl = _musicService.GetTrackPreviewUrl(iTrackId);
                return Json(new { Success = true, PreviewUrl = previewUrl });
            }
            return Json(new { Success = false, Message = "Invalid Track Id" });
        }

        /// <summary>
        /// Gets all the purchased songs of artist
        /// </summary>
        public ActionResult GetPurchasedSongs(int ArtistPageId, int Count = 15, int Page = 1)
        {
            var artistPage = _artistPageService.GetById(ArtistPageId);
            var modelList = new List<object>();
            int totalPages = 0, totalSales = 0;
            decimal totalGross = 0, totalFee = 0, totalNet = 0;
            if (artistPage != null && CanDelete(artistPage))
            {
                var customerOrderItems = _orderService.GetAllOrderItems(null, null, null, null, null, PaymentStatus.Paid, null, true);
                var artistPageSongProductIds = artistPage.Songs.Select(x => x.AssociatedProductId);
                //let's get the purchased items
                var purchasedItems = customerOrderItems.Where(x => artistPageSongProductIds.Contains(x.Product.Id));
                
                //summary
                totalSales = purchasedItems.Count();
                totalPages = Convert.ToInt32(Math.Ceiling((decimal)purchasedItems.Count() / Count));
                totalGross = purchasedItems.Sum(x => _taxSettings.PricesIncludeTax ? x.PriceInclTax : x.PriceExclTax);
                totalFee = (totalGross * _mobSocialSettings.PurchasedSongFeePercentage) / 100;
                totalNet = totalGross - totalFee;

                //pagination
                purchasedItems = purchasedItems.Skip(Count * (Page - 1)).Take(Count);

                foreach (var pi in purchasedItems)
                {
                    var song = _songService.GetSongByProductId(pi.Product.Id);
                    var grossPrice = _taxSettings.PricesIncludeTax ? pi.PriceInclTax : pi.PriceExclTax;
                    var feeAmount = (grossPrice * _mobSocialSettings.PurchasedSongFeePercentage) / 100;
                    var netPrice = grossPrice - feeAmount;
                    
                    //add new object to collection
                    modelList.Add(new
                    {
                        SongName = pi.Product.Name,
                        PurchasedOn = _dateTimeHelper.ConvertToUserTime( pi.Order.CreatedOnUtc,DateTimeKind.Utc).ToString(),
                        OrderId = pi.Order.Id,
                        PreviewUrl = song.PreviewUrl,
                        SellPrice = _priceFormatter.FormatPrice(grossPrice,true, _workContext.WorkingCurrency),
                        FeeAmount = _priceFormatter.FormatPrice(feeAmount, true, _workContext.WorkingCurrency),
                        NetPrice = _priceFormatter.FormatPrice(netPrice, true, _workContext.WorkingCurrency),
                        SeName = song.GetSeName(_workContext.WorkingLanguage.Id, true, false)
                    });
                }
            }
            var model = new {
                Songs = modelList,
                Page = Page,
                Count = Count,
                TotalPages = totalPages,
                TotalSellPrice = _priceFormatter.FormatPrice(totalGross, true, _workContext.WorkingCurrency),
                TotalFeeAmount = _priceFormatter.FormatPrice(totalFee, true, _workContext.WorkingCurrency),
                TotalNetPrice = _priceFormatter.FormatPrice(totalNet, true, _workContext.WorkingCurrency),
                TotalSales = totalSales
            };
            return Json(model);
        }

        public ActionResult Search()
        {
            return View(ControllerUtil.MobSocialViewsFolder + "/ArtistPage/Search.cshtml"); 
        }

        [HttpPost]
        public ActionResult Search(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false)
        {
            //we search for artists both in our database as well as the remote api
            var model = new List<object>();

            //first let's search our database
            var dbArtists = _artistPageService.SearchArtists(Term, Count, Page, SearchDescriptions);

            //first add db artists
            foreach (var dba in dbArtists)
            {
                var imageUrl = "";
                if (dba.Pictures.Count > 0)
                    imageUrl = _pictureService.GetPictureUrl(dba.Pictures.First().PictureId, _mobSocialSettings.ArtistPageThumbnailSize, true);
                else
                    imageUrl = _pictureService.GetDefaultPictureUrl();

                model.Add(new {
                    Name = dba.Name,
                    Id = dba.Id,
                    ImageUrl = imageUrl,
                    ShortDescription = dba.ShortDescription,
                    SeName = dba.GetSeName(_workContext.WorkingLanguage.Id, true, false),
                    RemoteArtist = false
                });
            }

            //do we need more records to show?
            if (dbArtists.Count() < Count)
            {
                //we need more records to show. lets go remote and import some records from there
                var remoteArtists = _artistPageApiService.SearchArtists(Term, Count - dbArtists.Count());
                if (remoteArtists != null)
                {
                    var remoteArtistsDeserialized = new List<JObject>();
                    foreach (string raItem in remoteArtists)
                    {
                        remoteArtistsDeserialized.Add((JObject)JsonConvert.DeserializeObject(raItem));
                    }

                    var remoteArtistIds = remoteArtistsDeserialized.Select(x => x["RemoteEntityId"].ToString()).ToList();

                    //filter out the results which are already in our result set
                    remoteArtistIds = remoteArtistIds.Except(dbArtists.Select(x => x.RemoteEntityId)).ToList();

                    //now add remote artists if any
                    foreach (string raid in remoteArtistIds)
                    {
                        var artistJson = remoteArtistsDeserialized.Where(x => x["RemoteEntityId"].ToString() == raid).First().ToString();
                        var artist = (JObject)JsonConvert.DeserializeObject(artistJson);
                        model.Add(new {
                            Name = artist["Name"].ToString(),
                            Id = raid,
                            ImageUrl = artist["ImageUrl"].ToString(),
                            ShortDescription = artist["ShortDescription"].ToString(),
                            SeName = raid,
                            RemoteArtist = true
                        });

                    }
                }
               
            }

            return Json(model);
        }

        /// <summary>
        /// Generic method for all inline updates
        /// </summary>
        [HttpPost]
        public ActionResult UpdateArtistData(FormCollection Parameters)
        {
            if (!_workContext.CurrentCustomer.IsRegistered())
                return InvokeHttp404();

            var IdStr = Parameters["id"];
            int Id;
            if (int.TryParse(IdStr, out Id))
            {
                var artistPage = _artistPageService.GetById(Id);

                if (CanEdit(artistPage))
                {
                    //find the key that'll be updated
                    var key = Parameters["key"];
                    var value = Parameters["value"];
                    switch (key)
                    {
                        case "Name":
                            artistPage.Name = value;
                            break;
                        case "Description":
                            artistPage.Biography = value;
                            break;
                        case "ShortDescription":
                            artistPage.ShortDescription = value;
                            break;
                        case "Gender":
                            artistPage.Gender = value;
                            break;
                        case "HomeTown":
                            artistPage.HomeTown = value;
                            break;
                    }                  
                    _artistPageService.Update(artistPage);
                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { success = false, message = "Unauthorized" });

                }
            }
            else
            {
                return Json(new { success = false, message = "Invalid artist" });
            }            

        }
        /// <summary>
        /// Returns artists pages for logged in user
        /// </summary>
        [Authorize]
        public ActionResult MyArtistPages()
        {
            return View(ControllerUtil.MobSocialViewsFolder + "/ArtistPage/MyPages.cshtml");
        }

        [HttpPost]
        public ActionResult MyArtistPages(string Search = "", int Count = 15, int Page = 1)
        {
            if (!_workContext.CurrentCustomer.IsRegistered())
                return InvokeHttp404();
            int totalPages;
            IList<ArtistPage> artistPages;
            artistPages = _artistPageService.GetArtistPagesByPageOwner(_workContext.CurrentCustomer.Id, out totalPages, Search, Count, Page, _workContext.CurrentCustomer.IsAdmin() /*orphan pages for administrator*/);


            var dataList = new List<object>();

            foreach (var artist in artistPages)
            {
                var tmodel = new {
                    Description = artist.Biography,
                    DateOfBirth = artist.DateOfBirth,
                    City = artist.HomeTown,
                    Gender = artist.Gender,
                    Name = artist.Name,
                    ShortDescription = artist.ShortDescription,
                    HomeTown = artist.HomeTown,
                    RemoteEntityId = artist.RemoteEntityId,
                    RemoteSourceName = artist.RemoteSourceName,
                    Id = artist.Id,
                    SeName = artist.GetSeName(_workContext.WorkingLanguage.Id, true, false),
                    MainPictureUrl = artist.Pictures.Count() > 0 ? _pictureService.GetPictureUrl(artist.Pictures.First().PictureId, _mobSocialSettings.ArtistPageMainImageSize, true) : _pictureService.GetDefaultPictureUrl() 
                };                
              

                dataList.Add(tmodel);
            }
            var model = new {
                Artists = dataList,
                TotalPages = totalPages,
                Count = Count,
                Page = Page
            };

            return Json(model);

        }

        /// <summary>
        /// Gets all pages managed by logged in user
        /// </summary>
        [HttpPost]
        public ActionResult GetPagesAsManager()
        {
            if (!_workContext.CurrentCustomer.IsRegistered())
                return InvokeHttp404();
            var artistPages = _artistPageManagerService.GetPagesAsManager(_workContext.CurrentCustomer.Id);
            var dataList = new List<object>();

            foreach (var artist in artistPages)
            {
                var tmodel = new {
                    Description = artist.Biography,
                    DateOfBirth = artist.DateOfBirth,
                    City = artist.HomeTown,
                    Gender = artist.Gender,
                    Name = artist.Name,
                    ShortDescription = artist.ShortDescription,
                    HomeTown = artist.HomeTown,
                    RemoteEntityId = artist.RemoteEntityId,
                    RemoteSourceName = artist.RemoteSourceName,
                    Id = artist.Id,
                    SeName = artist.GetSeName(_workContext.WorkingLanguage.Id, true, false),
                    MainPictureUrl = artist.Pictures.Count() > 0 ? _pictureService.GetPictureUrl(artist.Pictures.First().PictureId, _mobSocialSettings.ArtistPageMainImageSize, true) : _pictureService.GetDefaultPictureUrl()
                };


                dataList.Add(tmodel);
            }
            var model = new {
                Artists = dataList,
            };

            return Json(model);
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

            return View(ControllerUtil.MobSocialViewsFolder + "/ArtistPage/Editor.cshtml", model);

        }


        /// <summary>
        /// Checks if a particular artist name is available
        /// </summary>
        [HttpPost]
        public ActionResult CheckArtistNameAvailable(string Name)
        {
            /*
             * sends three parameters to client with json.
             * remoteArtist: specifies if remote artist is being sent if 'available' is true
             * artist: the artistJson response if 'available' is true
             * available: specifies if the name is 'available' or not
             */
            string artistJson;
            if (IsArtistPageNameAvailable(Name, out artistJson))
            {
              
                if (artistJson == "")
                {
                    return Json(new { available = true, remoteArtist = false });
                }
                else
                {
                    return Json(new { available = true, remoteArtist = true, artist = artistJson });
                }
                
            }
            else
            {
                return Json(new { available = false });
            }
        }


        /// <summary>
        /// Saves the artist pages. Performs insertion
        /// </summary>
        [HttpPost]
        public ActionResult SaveArtist(ArtistPageModel Model)
        {

            if (!ModelState.IsValid)
                return RedirectToRoute("HomePage");

            if (!_workContext.CurrentCustomer.IsRegistered())
                return InvokeHttp404();

            /*
             * returns two parameters as Json
             * success if operation succeeds true else false
             * message if operation fails
            */

            //check to see if artist name already exists
            string artistJson;
            if (IsArtistPageNameAvailable(Model.Name, out artistJson))
            {
                ArtistPage artistPage = new ArtistPage() {
                    PageOwnerId = _workContext.CurrentCustomer.Id,
                    Biography = Model.Description,
                    Name = Model.Name,
                    DateOfBirth = Model.DateOfBirth,
                    Gender = Model.Gender,
                    HomeTown = Model.HomeTown,
                    RemoteEntityId = Model.RemoteEntityId,
                    RemoteSourceName = Model.RemoteSourceName,
                    ShortDescription = Model.ShortDescription
                };

                _artistPageService.Insert(artistPage);

                if (artistJson != "")
                {
                    //we can now download the image from the server and store it on our own server
                    //use the json we retrieved earlier
                    var jObject = (JObject)JsonConvert.DeserializeObject(artistJson);

                    if (!string.IsNullOrEmpty(jObject["ImageUrl"].ToString()))
                    {
                        var imageUrl = jObject["ImageUrl"].ToString();
                        var imageBytes = HttpHelper.ExecuteGET(imageUrl);
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

                return Json(new {
                    Success = true,
                    RedirectTo = Url.RouteUrl("ArtistPageUrl", new { SeName = artistPage.GetSeName(_workContext.WorkingLanguage.Id, true, false) })
                });
            }
            else
            {
                return Json(new {
                    Success = false,
                    Message = "DuplicateName"
                });
            }

        }

        [HttpPost]
        public ActionResult GetEligibleManagers(int ArtistPageId)
        {
            //first lets find out if current user can actually play around with this page
            var artistPage = _artistPageService.GetById(ArtistPageId);
            var model = new List<object>();
            if (CanDelete(artistPage))
            {
                //so the current user is actually admin or the page owner. let's find friends
                //only friends can become page managers

                var friends = _mobSocialService.GetFriends(_workContext.CurrentCustomer.Id);
                
                foreach (var friend in friends)
                {
                    var friendId = (friend.FromCustomerId == _workContext.CurrentCustomer.Id) ? friend.ToCustomerId : friend.FromCustomerId;
                    var friendCustomer = _customerService.GetCustomerById(friendId);

                    if (friendCustomer == null)
                        continue;

                    var friendThumbnailUrl = _pictureService.GetPictureUrl(
                            friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                            100,
                            true);

                    model.Add(new {
                        CustomerDisplayName = friendCustomer.GetFullName().ToTitleCase(),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = friendCustomer.GetSeName(0) }),
                        ProfileImageUrl = friendThumbnailUrl,
                        Id = friendId
                    });
                }

                return Json(model);

            }
            return Json(model);
        }

        [HttpPost]
        public ActionResult GetPageManagers(int ArtistPageId)
        {
            //first lets find out if current user can actually play around with this page
            var artistPage = _artistPageService.GetById(ArtistPageId);
            var model = new List<object>();
            if (CanDelete(artistPage))
            {
                //so the current user is actually admin or the page owner. let's find managers

                var managers = _artistPageManagerService.GetPageManagers(ArtistPageId);
                
                foreach (var manager in managers)
                {

                    var customer = _customerService.GetCustomerById(manager.CustomerId);

                    if (customer == null)
                        continue;

                    var customerThumbnailUrl = _pictureService.GetPictureUrl(
                            customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                            100,
                            true);

                    model.Add(new {
                        CustomerDisplayName = customer.GetFullName().ToTitleCase(),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }),
                        ProfileImageUrl = customerThumbnailUrl,
                        Id = customer.Id
                    });
                }

                return Json(model);

            }
            return Json(model);
        }

        [HttpPost]
        public ActionResult SavePageManager(int ArtistPageId, int CustomerId)
        {
            //let's perform a few checks before saving the page manager
            //1. does the artist page exist and is the current user eligible to add manager?
            var artistPage = _artistPageService.GetById(ArtistPageId);
            if (artistPage != null && CanDelete(artistPage))
            {
               //2. does the customer really exist?
                var customer = _customerService.GetCustomerById(CustomerId);
                if (customer != null)
                {
                    //3. is the customer already a page manager
                    if (_artistPageManagerService.IsPageManager(ArtistPageId, CustomerId))
                    {
                        return Json(new { Success = false, Message = "AlreadyPageManager" }); 
                    }
                    else
                    {
                        //enough checks...save the new manager now
                        _artistPageManagerService.AddPageManager(new ArtistPageManager() {
                            ArtistPageId = ArtistPageId,
                            CustomerId = CustomerId,                            
                        });
                       
                        return Json(new { Success = true });
                    }
                }
                else
                {
                    return Json(new { Success = false, Message = "CustomerDoesNotExit" }); 
                }
            }
            else
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }
        }

        [HttpPost]
        public ActionResult DeletePageManager(int ArtistPageId, int CustomerId)
        {
            //let's perform a few checks before saving the page manager
            //1. does the artist page exist and is the current user eligible to add manager?
            var artistPage = _artistPageService.GetById(ArtistPageId);
            if (artistPage != null && CanDelete(artistPage))
            {
                //2. does the customer really exist?
                var customer = _customerService.GetCustomerById(CustomerId);
                if (customer != null)
                {
                    _artistPageManagerService.DeletePageManager(ArtistPageId, CustomerId);

                    return Json(new { Success = true });
                }
                else
                {
                    return Json(new { Success = false, Message = "CustomerDoesNotExit" });
                }
            }
            else
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }
        }
        [HttpPost]
        public ActionResult DeleteArtistPage(int ArtistPageId)
        {
            var artist = _artistPageService.GetById(ArtistPageId);
            if (CanDelete(artist))
            {
                //the logged in user can delete the page. lets delete the associated things now
                while (artist.Pictures.Count() != 0)
                {
                    foreach (var artistpicture in artist.Pictures)
                    {
                        var picture = _pictureService.GetPictureById(artistpicture.PictureId);
                        _artistPageService.DeletePicture(artistpicture);
                        _pictureService.DeletePicture(picture);
                        //collection modified. so better break the loop and let it run agian.

                        break;
                    }
                }
                
                _artistPageService.Delete(artist);
                return Json(new { Success = true });
            }
            else
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }
        }

        [HttpPost]
        public ActionResult UploadPicture(int ArtistPageId, IEnumerable<HttpPostedFileBase> file)
        {
            
            //first get artist page
            var artistPage = _artistPageService.GetById(ArtistPageId);
            if (!CanEdit(artistPage))
                return Json(new { Success = false, Message = "Unauthorized" });

            var files = file.ToList();
            var newImageUrl = "";
            foreach (var fi in files)
            {
                Stream stream = null;
                var fileName = "";
                var contentType = "";

                if (file == null)
                    throw new ArgumentException("No file uploaded");

                stream = fi.InputStream;
                fileName = Path.GetFileName(fi.FileName);
                contentType = fi.ContentType;

                var fileBinary = new byte[stream.Length];
                stream.Read(fileBinary, 0, fileBinary.Length);

                var fileExtension = Path.GetExtension(fileName);
                if (!String.IsNullOrEmpty(fileExtension))
                    fileExtension = fileExtension.ToLowerInvariant();


                if (String.IsNullOrEmpty(contentType))
                {
                    contentType = PictureUtility.GetContentType(fileExtension);
                }

                var picture = _pictureService.InsertPicture(fileBinary, contentType, null);


                var firstArtistPagePicture = _artistPageService.GetFirstEntityPicture(ArtistPageId);

                if (firstArtistPagePicture == null)
                {
                    firstArtistPagePicture = new ArtistPagePicture() {                        
                        EntityId = ArtistPageId,
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        DisplayOrder = 1,
                        PictureId = picture.Id
                    };
                    _artistPageService.InsertPicture(firstArtistPagePicture);
                }
                else
                {
                    firstArtistPagePicture.EntityId = ArtistPageId;
                    firstArtistPagePicture.DateCreated = DateTime.Now;
                    firstArtistPagePicture.DateUpdated = DateTime.Now;
                    firstArtistPagePicture.DisplayOrder = 1;
                    firstArtistPagePicture.PictureId = picture.Id;
                    _artistPageService.UpdatePicture(firstArtistPagePicture);
                }
                newImageUrl = _pictureService.GetPictureUrl(firstArtistPagePicture.PictureId, 0, true);

            }

            return Json(new { Success = true, Url = newImageUrl });
        }

        [HttpPost]
        public ActionResult GetPaymentMethod(int ArtistPageId)
        {
            var artistPage = _artistPageService.GetById(ArtistPageId);

            if (CanDelete(artistPage))
            {
                //the user can access payment method. let's fetch it.

                var paymentMethod = _artistPagePaymentService.GetPaymentMethod(ArtistPageId);
                if (paymentMethod != null)
                {
                    var model = new ArtistPagePaymentModel() {
                        AccountNumber = paymentMethod.AccountNumber,
                        Address = paymentMethod.Address,
                        BankName = paymentMethod.BankName,
                        City = paymentMethod.City,
                        Country = paymentMethod.Country,
                        PostalCode = paymentMethod.PostalCode,
                        PayableTo = paymentMethod.PayableTo,
                        PaymentTypeId = (int)paymentMethod.PaymentType,
                        PaypalEmail = paymentMethod.PaypalEmail,
                        RoutingNumber = paymentMethod.RoutingNumber,
                        ArtistPageId = paymentMethod.ArtistPageId,
                        Id=paymentMethod.Id
                    };
                    return Json(new { Success = true, PaymentMethod = model });
                }
                else
                {
                    var model = new ArtistPagePaymentModel() {
                        ArtistPageId = ArtistPageId,
                        PaymentTypeId = (int)ArtistPagePayment.PagePaymentType.Paypal
                    };
                    return Json(new { Success = true, PaymentMethod = model });
                }
               
            }
            else
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }
        }

        [HttpPost]
        public ActionResult SavePaymentMethod(ArtistPagePaymentModel Model)
        {
            if (!ModelState.IsValid)
                return InvokeHttp404();

            var artistPage = _artistPageService.GetById(Model.ArtistPageId);
            if (CanEdit(artistPage))
            {
                ArtistPagePayment paymentMethod;
                paymentMethod = _artistPagePaymentService.GetPaymentMethod(Model.ArtistPageId);
                if (paymentMethod == null)
                {
                    paymentMethod = new ArtistPagePayment();
                }               
                //set the new values
                paymentMethod.AccountNumber = Model.AccountNumber;
                paymentMethod.Address = Model.Address;
                paymentMethod.ArtistPageId = Model.ArtistPageId;
                paymentMethod.BankName = Model.BankName;
                paymentMethod.City = Model.City;
                paymentMethod.Country = Model.Country;
                paymentMethod.PostalCode = Model.PostalCode;
                paymentMethod.PayableTo = Model.PayableTo;
                paymentMethod.PaymentType = (ArtistPagePayment.PagePaymentType)Model.PaymentTypeId;
                paymentMethod.PaypalEmail = Model.PaypalEmail;
                paymentMethod.RoutingNumber = Model.RoutingNumber;

                if (paymentMethod.Id == 0)
                    _artistPagePaymentService.InsertPaymentMethod(paymentMethod);
                else
                    _artistPagePaymentService.UpdatePaymentMethod(paymentMethod);

                return Json(new { Success = true });
            }
            else
            {
                return Json(new { Success = false, Message = "Unauthorized" });

            }
        }
        #endregion



        #region functions

        [NonAction]
        bool IsArtistPageNameAvailable(string Name, out string ArtistJson)
        {
            ArtistJson = "";
            if (string.IsNullOrEmpty(Name))
                return false;

            //first check if an artist page with this name exists in our database. If it does, game over. It's unavailable now.
            var artistPage = _artistPageService.GetArtistPageByName(Name);
            if (artistPage != null)
                return false;

            //so it's not available in our database. let's now check if it's a remote api artist.
            //if it's a remote api artist, then user must be admin to create this artist page else it wont be available

            if (_artistPageApiService.DoesRemoteArtistExist(Name))
            {
                if (_workContext.CurrentCustomer.IsAdmin())
                {
                    ArtistJson = _artistPageApiService.GetRemoteArtist(Name);
                    return true;
                }
                else
                {
                    //user is not admin so not available because only admin is allowed to create the remote artist page
                    return false;
                }
            }
            else
            {
                //remote name doesn't exists. so this is available.
                return true;
            }
        }


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

        /// <summary>
        /// Checks if current logged in user can actually delete the page
        /// </summary>
        /// <returns>True if deletion is allowed. False otherwise</returns>
        [NonAction]
        bool CanDelete(ArtistPage ArtistPage)
        {
            if (ArtistPage == null)
                return false;
            return _workContext.CurrentCustomer.Id == ArtistPage.PageOwnerId //page owner
                || _workContext.CurrentCustomer.IsAdmin(); //administrator
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
