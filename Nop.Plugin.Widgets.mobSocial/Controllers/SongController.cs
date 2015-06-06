using Nop.Web.Controllers;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Web.Framework.Security;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Customers;
using Nop.Services.Helpers;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web;
using Mob.Core;
using Nop.Plugin.Widgets.MobSocial.Helpers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    [NopHttpsRequirement(SslRequirement.No)]
    public partial class SongController : BasePublicController
    {
        #region variables
        private readonly ILocalizationService _localizationService;
        private readonly IPictureService _pictureService;
        private readonly ICustomerService _customerService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly CustomerSettings _customerSettings;
        private readonly MediaSettings _mediaSettings;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly IWorkContext _workContext;
        private readonly IMobSocialService _mobSocialService;
        private readonly IArtistPageAPIService _artistPageApiService;
        private readonly ISongService _songService;
        private readonly IMusicService _musicService;

        public SongController(ILocalizationService localizationService,
            IPictureService pictureService,
            ICustomerService customerService,
            IDateTimeHelper dateTimeHelper,
            CustomerSettings customerSettings,
            MediaSettings mediaSettings,
            IArtistPageAPIService artistPageApiService,
            ISongService songService,
            IMusicService musicService,
            mobSocialSettings mobSocialSettings,
            IMobSocialService mobSocialService,
            IWorkContext workContext)
        {
            _localizationService = localizationService;
            _pictureService = pictureService;
            _customerService = customerService;
            _dateTimeHelper = dateTimeHelper;
            _customerSettings = customerSettings;
            _mediaSettings = mediaSettings;
            _mobSocialSettings = mobSocialSettings;
            _mobSocialService = mobSocialService;
            _workContext = workContext;
            _artistPageApiService = artistPageApiService;
            _songService = songService;
            _musicService = musicService;
        }

        #endregion

        #region Actions
        public ActionResult Index(int Id)
        {
            var song = _songService.GetById(Id);

            if (song == null)
                return InvokeHttp404(); //not found

            var model = new SongModel() {
                Description = song.Description,               
                Name = song.Name,
                RemoteEntityId = song.RemoteEntityId,
                RemoteSourceName = song.RemoteSourceName,                
                Id = song.Id
            };

            //images for artist
            foreach (var picture in song.Pictures)
            {
                model.Pictures.Add(new PictureModel {
                    Id = picture.Id,
                    EntityId = song.Id,
                    PictureId = picture.PictureId,
                    DisplayOrder = picture.DisplayOrder,
                    DateCreated = picture.DateCreated,
                    DateUpdated = picture.DateUpdated,
                    PictureUrl = _pictureService.GetPictureUrl(picture.PictureId, 0, true),
                });
            }
            if (model.Pictures.Count > 0)
                model.MainPictureUrl = model.Pictures[0].PictureUrl;

            model.CanEdit = CanEdit(song);
            model.CanDelete = CanDelete(song);

            return View(ControllerUtil.MobSocialViewsFolder + "/ArtistPage/Index.cshtml", model);
        }


        /// <summary>
        /// Imports a new song from remote api if it doesn't exist in our database
        /// </summary>
        public ActionResult RemoteSong(string RemoteEntityId)
        {
            if (!string.IsNullOrEmpty(RemoteEntityId))
            {
                var song = _songService.GetSongByRemoteEntityId(RemoteEntityId);
                if (song == null)
                {
                    //we need to create a new song now
                    var remoteSong = _artistPageApiService.GetRemoteSong(RemoteEntityId);
                    if (remoteSong == null)
                        return InvokeHttp404();

                    song = SaveRemoteSongToDB(remoteSong);
                    return RedirectToRoute("SongUrl", new { SeName = song.GetSeName(_workContext.WorkingLanguage.Id, true, false) });
                }
                else
                {
                    //the page already exists in our database. No need to create duplicate entries. Rather redirect them to the actual artist page
                    return RedirectToRoute("SongUrl", new { SeName = song.GetSeName(_workContext.WorkingLanguage.Id, true, false) });
                }
            }
            //totally unknown path
            return InvokeHttp404();
        }

        
        [HttpPost]
        public ActionResult GetSongPreviewUrl(string TrackId)
        {
            int iTrackId;
            if (int.TryParse(TrackId, out iTrackId))
            {
                var previewUrl = _musicService.GetTrackPreviewUrl(iTrackId);
                return Json(new { Success = true, PreviewUrl = previewUrl });
            }
            return Json(new { Success = false, Message = "Invalid Track Id" });
        }

        [HttpPost]
        public ActionResult Search(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false)
        {
            //we search for artists both in our database as well as the remote api
            var model = new List<object>();

            //first let's search our database
            var dbSongs = _songService.SearchSongs(Term, Count, Page, SearchDescriptions, SearchArtists);

            //first add db artists
            foreach (var dbs in dbSongs)
            {
                var imageUrl = "";
                if (dbs.Pictures.Count > 0)
                    imageUrl = _pictureService.GetPictureUrl(dbs.Pictures.First().PictureId, _mobSocialSettings.ArtistPageThumbnailSize, true);
                else
                    imageUrl = _pictureService.GetPictureUrl(0, _mobSocialSettings.ArtistPageThumbnailSize, true);

                string affiliateUrl = "";
                int iTrackId;
                if (int.TryParse(dbs.TrackId, out iTrackId))
                {
                    affiliateUrl = _musicService.GetTrackAffiliateUrl(iTrackId);
                }

             
                model.Add(new {
                    Name = dbs.Name,
                    Id = dbs.Id,
                    ImageUrl = imageUrl,
                    SeName = dbs.GetSeName(_workContext.WorkingLanguage.Id, true, false),
                    TrackId = dbs.TrackId,
                    AffiliateUrl = affiliateUrl,
                    RemoteSong = false
                });
            }

            //do we need more records to show?
            if (dbSongs.Count() < Count)
            {
                //we need more records to show. lets go remote and import some records from there
                var remoteSongs = _artistPageApiService.SearchSongs(Term, string.Empty /*artist name*/, Count - dbSongs.Count());
                if (remoteSongs != null)
                {
                    var remoteSongsDeserialized = new List<JObject>();
                    foreach (string rsItem in remoteSongs)
                    {
                        remoteSongsDeserialized.Add((JObject)JsonConvert.DeserializeObject(rsItem));
                    }

                    var remoteSongIds = remoteSongsDeserialized.Select(x => x["RemoteEntityId"].ToString()).ToList();

                    //filter out the results which are already in our result set
                    remoteSongIds = remoteSongIds.Except(dbSongs.Select(x => x.RemoteEntityId)).ToList();

                    //now add remote artists if any
                    foreach (string raid in remoteSongIds)
                    {
                        var songJson = remoteSongsDeserialized.Where(x => x["RemoteEntityId"].ToString() == raid).First().ToString();
                        var song = (JObject)JsonConvert.DeserializeObject(songJson);
                        string affiliateUrl = "";
                        int iTrackId;
                        if (int.TryParse(song["TrackId"].ToString(), out iTrackId))
                        {
                            affiliateUrl = _musicService.GetTrackAffiliateUrl(iTrackId);
                        }


                        model.Add(new {
                            Name = song["Name"].ToString(),
                            Id = raid,
                            ImageUrl = song["ImageUrl"].ToString(),
                            SeName = raid,
                            TrackId = song["TrackId"].ToString(),
                            AffiliateUrl = affiliateUrl,
                            RemoteSong = true
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
        public ActionResult UpdateSongData(FormCollection Parameters)
        {
            if (!_workContext.CurrentCustomer.IsRegistered())
                return InvokeHttp404();

            var IdStr = Parameters["id"];
            int Id;
            if (int.TryParse(IdStr, out Id))
            {
                var song = _songService.GetById(Id);

                if (CanEdit(song))
                {
                    //find the key that'll be updated
                    var key = Parameters["key"];
                    var value = Parameters["value"];
                    switch (key)
                    {
                        case "Name":
                            song.Name = value;
                            break;
                        case "Description":
                            song.Description = value;
                            break;                       
                    }
                    _songService.Update(song);
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


      


        [HttpPost]
        public ActionResult DeleteSong(int SongId)
        {
            var song = _songService.GetById(SongId);
            if (CanDelete(song))
            {
                //the logged in user can delete the page. lets delete the associated things now
                while (song.Pictures.Count() != 0)
                {
                    foreach (var artistpicture in song.Pictures)
                    {
                        var picture = _pictureService.GetPictureById(artistpicture.PictureId);
                        _songService.DeletePicture(artistpicture);
                        _pictureService.DeletePicture(picture);
                        //collection modified. so better break the loop and let it run agian.

                        break;
                    }
                }

                _songService.Delete(song);
                return Json(new { Success = true });
            }
            else
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }
        }

        [HttpPost]
        public ActionResult UploadPicture(int SongId, IEnumerable<HttpPostedFileBase> file)
        {

            //first get song
            var song = _songService.GetById(SongId);
            if (!CanEdit(song))
                return Json(new { Success = false, Message = "Unauthorized" });

            var files = file.ToList();
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

                var picture = _pictureService.InsertPicture(fileBinary, contentType, null, true);


                var firstSongPicture = _songService.GetFirstEntityPicture(SongId);

                if (firstSongPicture == null)
                {
                    firstSongPicture = new SongPicture() {
                        SongId = SongId,
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        DisplayOrder = 1,
                        PictureId = picture.Id
                    };
                    _songService.InsertPicture(firstSongPicture);
                }
                else
                {
                    firstSongPicture.SongId = SongId;
                    firstSongPicture.DateCreated = DateTime.Now;
                    firstSongPicture.DateUpdated = DateTime.Now;
                    firstSongPicture.DisplayOrder = 1;
                    firstSongPicture.PictureId = picture.Id;
                    _songService.UpdatePicture(firstSongPicture);
                }

            }

            return Json(new { Success = true });
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


        /// <summary>
        /// Checks if current logged in user can actually edit the page
        /// </summary>
        /// <returns>True if editing is allowed. False otherwise</returns>
        [NonAction]
        bool CanEdit(Song Song)
        {
            if (Song == null)
                return false;
            return _workContext.CurrentCustomer.Id == Song.PageOwnerId //page owner
                || _workContext.CurrentCustomer.IsAdmin(); //administrator
        }

        /// <summary>
        /// Checks if current logged in user can actually delete the page
        /// </summary>
        /// <returns>True if deletion is allowed. False otherwise</returns>
        [NonAction]
        bool CanDelete(Song Song)
        {
            if (Song == null)
                return false;
            return _workContext.CurrentCustomer.Id == Song.PageOwnerId //page owner
                || _workContext.CurrentCustomer.IsAdmin(); //administrator
        }

        [NonAction]
        Song SaveRemoteSongToDB(string songJson)
        {
            /*if (string.IsNullOrEmpty(songJson))
                return null;

            var artist = (JObject)JsonConvert.DeserializeObject(songJson);
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
                var fileExtension = Path.GetExtension(imageUrl);
                if (!String.IsNullOrEmpty(fileExtension))
                    fileExtension = fileExtension.ToLowerInvariant();

                var contentType = PictureUtility.GetContentType(fileExtension);

                var picture = _pictureService.InsertPicture(imageBytes, contentType, artistPage.GetSeName(_workContext.WorkingLanguage.Id, true, false), true);
                var artistPicture = new ArtistPagePicture() {
                    ArtistPageId = artistPage.Id,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now,
                    DisplayOrder = 1,
                    PictureId = picture.Id
                };
                _artistPageService.InsertPicture(artistPicture);
            }
            return artistPage;*/
            return null;
        }

        #endregion

      

    }
}
