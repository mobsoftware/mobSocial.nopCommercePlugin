using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Forums;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Seo;
using Nop.Plugin.WebApi.MobSocial.Domain;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Orders;
using Nop.Services.Security;
using Nop.Services.Seo;
using Mob.Core;
using System.Web;
using Nop.Plugin.WebApi.MobSocial;
using Nop.Plugin.WebApi.MobSocial.Constants;
using Nop.Plugin.WebApi.MobSocial.Enums;
using Nop.Plugin.WebApi.MobSocial.Models;
using Nop.Plugin.WebApi.MobSocial.Models.TeamPage;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Web.Controllers;
using SeoExtensions = Nop.Plugin.WebApi.MobSocial.Extensions.SeoExtensions;


namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class mobSocialController : BasePublicController
    {

        private IPermissionService _permissionService;
        private readonly IWorkContext _workContext;
        private AdminAreaSettings _adminAreaSettings;
        private ILocalizationService _localizationService;
        private readonly IPictureService _pictureService;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly MediaSettings _mediaSettings;
        private readonly CustomerSettings _customerSettings;
        private readonly OrderService _orderService;
        private readonly ForumSettings _forumSettings;
        private readonly RewardPointsSettings _rewardPointsSettings;
        private readonly OrderSettings _orderSettings;
        private readonly IStoreContext _storeContext;
        private readonly IMobSocialService _socialNetworkService;
        private readonly ICustomerService _customerService;
        private readonly ICustomerAlbumPictureService _customerAlbumPictureService;
        private IWebHelper _webHelper;
        private readonly IUrlRecordService _urlRecordService;
        private readonly IRepository<UrlRecord> _urlRecordRepository;
        private readonly ICustomerVideoAlbumService _customerVideoAlbumService;
        private readonly CustomerProfileViewService _customerProfileViewService;

        public mobSocialController(IPermissionService permissionService,
            IWorkContext workContext, AdminAreaSettings adminAreaSettings, ILocalizationService localizationService,
            IPictureService pictureService, IMobSocialService socialNetworkService, ICustomerService customerService,
            ICustomerAlbumPictureService customerAlbumPictureService, mobSocialSettings mobSocialSettings, MediaSettings mediaSettings, CustomerSettings customerSettings, 
            ForumSettings forumSettings, RewardPointsSettings rewardPointsSettings, OrderSettings orderSettings,
             IStoreContext storeContext, IWebHelper webHelper, IUrlRecordService urlRecordService, IRepository<UrlRecord> urlRecordRepository,
            ICustomerVideoAlbumService customerVideoAlbumService, CustomerProfileViewService customerProfileViewService)
        {
            _permissionService = permissionService;
            _workContext = workContext;
            _adminAreaSettings = adminAreaSettings;
            _localizationService = localizationService;
            _pictureService = pictureService;
            _socialNetworkService = socialNetworkService;
            _customerService = customerService;
            _customerAlbumPictureService = customerAlbumPictureService;
            _mobSocialSettings = mobSocialSettings;
            _mediaSettings = mediaSettings;
            _customerSettings = customerSettings;
            _forumSettings = forumSettings;
            _rewardPointsSettings = rewardPointsSettings;
            _orderSettings = orderSettings;
            _storeContext = storeContext;
            _webHelper = webHelper;
            _urlRecordService = urlRecordService;
            _urlRecordRepository = urlRecordRepository;
            _customerVideoAlbumService = customerVideoAlbumService;
            _customerProfileViewService = customerProfileViewService;
        }


        public ActionResult ProfileInformation()
        {


            var model = new ProfileInformationModel();

            model.NavigationModel = SessionState.Instance.CustomerNavigationModel;

            return View("mobSocial/WidgetZones/ProfileInformation", model);

        }

        [ChildActionOnly]
        public ActionResult SocialNetworkByMobSocial(string widgetZone)
        {
            return Content("social network by <a href=\"http://github.com/mobsoftware/mobsocial\">mobSocial</a>");
        }


        public ActionResult HeadTagInclusions()
        {
            return View("mobSocial/WidgetZones/head_html_tag");
        }

        public ActionResult GlobalSearchOptions()
        {
            return View("mobSocial/WidgetZones/searchbox_before_search_button");
        }
        
        public ActionResult Configure()
        {

            var model = new ConfigurationModel
                {
                    ZoneId = _mobSocialSettings.WidgetZone
                };

            model.AvailableZones.Add(new SelectListItem() { Text = "Before left side column", Value = "left_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After left side column", Value = "left_side_column_after" });
            model.AvailableZones.Add(new SelectListItem() { Text = "Before right side column", Value = "right_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After right side column", Value = "right_side_column_after" });

            return View("mobSocial/Configure", model);

        }

        public ActionResult PopulateUrlSlugs()
        {


            var customers = _customerService.GetAllCustomers();

            foreach (var customer in customers)
            {
                if(customer.IsGuest())
                    continue;

                string firstName = customer.GetAttribute<string>(SystemCustomerAttributeNames.FirstName);
                string lastName = customer.GetAttribute<string>(SystemCustomerAttributeNames.LastName);

                if (firstName == null || lastName == null)
                    continue;


                // todo: pull line below out into a service method
                 bool customerAlreadyHasCustomUrl = _urlRecordRepository.Table
                                    .Any(urlRecord => urlRecord.EntityId == customer.Id && 
                                                    urlRecord.EntityName == "Customer");

                if (!customerAlreadyHasCustomUrl)
                {

                   
                    var customersWithSameName = _customerService.GetAllCustomers(default(DateTime?), default(DateTime?),
                            0, 0, null, null, null, firstName, lastName);

                    int numberSameNameWithSlugs = customersWithSameName.Count(c => _urlRecordRepository.Table
                                     .Any(urlRecord => urlRecord.EntityId == c.Id && urlRecord.EntityName == "Customer"));


                    string slug = firstName.Trim() + "-" + lastName.Trim() + 
                       ( (numberSameNameWithSlugs > 0)
                                      ? "-" + (numberSameNameWithSlugs + 1).ToString()
                                      : string.Empty );

                    
                   _urlRecordService.InsertUrlRecord(new UrlRecord() {
                       EntityId = customer.Id,
                       EntityName = "Customer",
                       LanguageId = 0,
                       Slug = slug.ToLowerInvariant(),
                       IsActive = true
                   });
                   
                }
            }


            return Content("Done");


        }



        

        


        // todo add security to pertinent actions
        public ActionResult CustomerFriendBlock(int customerId, int howMany)
        {

            if(customerId == -1)
                customerId = _workContext.CurrentCustomer.Id;

             var friends = _socialNetworkService.GetRandomFriends(customerId, howMany);

            var model = new List<CustomerFriendModel>();

            foreach (var friend in friends)
            {

                var friendId = (friend.FromCustomerId == customerId) ? friend.ToCustomerId : friend.FromCustomerId;



                var friendCustomer = _customerService.GetCustomerById(friendId);

                if(friendCustomer == null)
                    continue;

                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        50,
                        true);

                model.Add(new CustomerFriendModel()
                    {
                        CustomerDisplayName = friendCustomer.GetFullName().ToTitleCase(),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = SeoExtensions.GetSeName(friendCustomer, 0) }),
                        ProfileThumbnailUrl = friendThumbnailUrl
                    });

            }



            return View("mobSocial/_CustomerFriendBlock", model);

        }


        public ActionResult MyHealth()
        {



            var friendRequests = _socialNetworkService.GetFriendRequests(_workContext.CurrentCustomer.Id);

            var model = new FriendRequestsModel();

            model.NavigationModel = SessionState.Instance.CustomerNavigationModel;

            foreach (var request in friendRequests)
            {

                var friendId = request.FromCustomerId;
                var friendCustomer = _customerService.GetCustomerById(friendId);
                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        75);

                model.FriendRequests.Add(new FriendRequestModel()
                {
                    FriendId = friendId,
                    CustomerDisplayName = friendCustomer.GetFullName(),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = SeoExtensions.GetSeName(friendCustomer, 0) }),
                    ProfileThumbnailUrl = friendThumbnailUrl
                });

            }



            return View("mobSocial/MyHealth", model);

        }




        public ActionResult FriendRequests()
        {

            
            var friendRequests = _socialNetworkService.GetFriendRequests(_workContext.CurrentCustomer.Id);

            var model = new FriendRequestsModel();

            model.NavigationModel = SessionState.Instance.CustomerNavigationModel;
            
            foreach (var request in friendRequests)
            {

                var friendId = request.FromCustomerId;
                var friendCustomer = _customerService.GetCustomerById(friendId);
                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        75);

                model.FriendRequests.Add(new FriendRequestModel()
                    {
                        FriendId = friendId,
                        CustomerDisplayName = friendCustomer.GetFullName(),
                        ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = SeoExtensions.GetSeName(friendCustomer, 0) }),
                        ProfileThumbnailUrl = friendThumbnailUrl
                    });

            }



            return View("mobSocial/FriendRequests", model);

        }
        


        // todo add security to pertinent actions
        public ActionResult CustomerFriends(int customerId)
        {

            if (customerId == -1)
                customerId = _workContext.CurrentCustomer.Id;

            var friends = _socialNetworkService.GetFriends(customerId);
            
            var model = new List<CustomerFriendModel>();

            foreach (var friend in friends)
            {
                
                var friendId = (friend.FromCustomerId == customerId) ? friend.ToCustomerId : friend.FromCustomerId;

                var friendCustomer = _customerService.GetCustomerById(friendId);

                if (friendCustomer == null) continue;

                var friendThumbnailUrl = _pictureService.GetPictureUrl(
                        friendCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        100,
                        true);

                model.Add(new CustomerFriendModel()
                {
                    CustomerDisplayName = friendCustomer.GetFullName().ToTitleCase(),
                    ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = SeoExtensions.GetSeName(friendCustomer, 0) }),
                    ProfileThumbnailUrl = friendThumbnailUrl
                });

            }



            return View("mobSocial/_CustomerFriends", model);

        }

        // todo add security to pertinent actions
        //todo consolidate left profile actions into one view and action for performance
        public ActionResult AddFriendButton(int toCustomerId)
        {

            var model = new AddFriendButtonModel();
            model.CustomerProfileId = toCustomerId;
            model.CurrentCustomerId = _workContext.CurrentCustomer.Id;

            FriendStatus friendStatus = _socialNetworkService.GetFriendRequestStatus(_workContext.CurrentCustomer.Id, toCustomerId);

            model.ShowAddFriendButton = friendStatus == FriendStatus.None;
            model.ShowFriendsButton = friendStatus == FriendStatus.Friends;
            model.ShowConfirmFriendButton = friendStatus == FriendStatus.NeedsConfirmed;
            model.ShowFriendRequestSent = friendStatus == FriendStatus.FriendRequestSent;
            
            return View("mobSocial/_AddFriendButton", model);

        } 



     /*   // todo add security to pertinent actions
        public ActionResult Team(int teamId)
        {

            var team = _socialNetworkService.GetTeam(teamId);

            if (teamId == 1 && team == null)
            {
                CreateSampleData();
                team = _socialNetworkService.GetTeam(teamId);
            }



            var model = new TeamPageModel()
                {

                    TeamName = team.Name,
                    TeamDescription = team.Description,
                    TeamPictureUrl = team.TeamPictureUrl
                };

            var groupPages = team.GroupPages.OrderBy(x => x.DisplayOrder);

            // team groups
            foreach (var group in groupPages)
            {

                var groupModel = new TeamPageGroupModel()
                    {
                        Name = group.Name,
                        Description = group.Description,

                    };


                var groupMembers = group.Members.OrderBy(x => x.DisplayOrder);

                // team group members 
                foreach (var member in groupMembers)
                {

                    var memberCustomer = _customerService.GetCustomerById(member.CustomerId);
                    var memberThumbnailUrl = _pictureService.GetPictureUrl(
                        memberCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId),
                        150,
                        true);

                    
                    groupModel.Members.Add(new TeamPageGroupMemberModel()
                        {
                            DisplayName = memberCustomer.GetFullName(),
                            ProfileUrl =  Url.RouteUrl("CustomerProfileUrl", new { SeName = SeoExtensions.GetSeName(memberCustomer, 0) }),
                            ThumbnailUrl = memberThumbnailUrl
                        });
                }

                model.Groups.Add(groupModel);



            }

            return View("mobSocial/TeamPage", model);

        }
        */

        /// <summary>
        /// Gets the main customer album
        /// </summary>
        /// <returns></returns>
        public ActionResult CustomerAlbumMain(int customerId)
        {

            var mainAlbum = _customerAlbumPictureService.GetCustomerAlbum(customerId);
            if (mainAlbum == null) _customerAlbumPictureService.CreateCustomerMainAlbum(customerId);


            var albumModel = new CustomerAlbumModel();

            albumModel.CustomerFullName = _customerService.GetCustomerById(customerId).GetFullName();

            if (mainAlbum != null)
            {
                albumModel.AlbumId = mainAlbum.Id;
                albumModel.AlbumName = mainAlbum.Name;



                albumModel.IsCurrentUsersProfile = _workContext.CurrentCustomer.Id == customerId;


                var mainAlbumPictures = mainAlbum.Pictures.OrderBy(x => x.DisplayOrder);

                foreach (var picture in mainAlbumPictures)
                {
                    var albumPictureModel = new CustomerAlbumPictureModel()
                    {
                        Id = picture.Id,
                        Caption = picture.Caption,
                        Url = picture.Url,
                        ThumbnailUrl = picture.ThumbnailUrl,
                        DateCreated = picture.DateCreated,
                        DateUpdated = picture.DateUpdated
                    };

                    albumModel.Pictures.Add(albumPictureModel);

                }
            }

            return View("mobSocial/_CustomerAlbumPictures", albumModel);

        }



        public ActionResult FeaturedVideos()
        {

            var model = new FeaturedVideosModel();

            var featuredVideos = _customerVideoAlbumService.GetFeaturedVideos();

            /*foreach (var video in featuredVideos)
            {*/

            if (featuredVideos != null)
            {
                var videoCustomer = _customerService.GetCustomerById(featuredVideos.VideoAlbum.CustomerId);


                var featuredVideoUrlParts = featuredVideos.VideoUrl.Split('/');

                var embedId = featuredVideoUrlParts.LastOrDefault();
                
                var featuredVideoModel = new FeaturedVideoModel()
                    {

                        ThumbnailUrl = "//img.youtube.com/vi/" + embedId + "/1.jpg",
                        CustomerProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = SeoExtensions.GetSeName(videoCustomer, 0) })
                    };

                model.FeaturedVideos.Add(featuredVideoModel);

            }


            return View("mobSocial/_FeaturedVideosBlock", model);


        }

        /// <summary>
        /// Gets the main customer video album 
        /// </summary>
        /// <returns></returns>
        public ActionResult CustomerVideoAlbumMain(int customerId)
        {
            
            var mainVideoAlbum = _customerVideoAlbumService.GetCustomerMainVideoAlbum(customerId);
            if (mainVideoAlbum == null) _customerVideoAlbumService.CreateCustomerMainVideoAlbum(customerId);


            var videoAlbumModel = new CustomerVideoAlbumModel();

            videoAlbumModel.CustomerFullName = _customerService.GetCustomerById(customerId).GetFullName();

            if (mainVideoAlbum != null)
            {
                videoAlbumModel.VideoAlbumId = mainVideoAlbum.Id;
                videoAlbumModel.Name = mainVideoAlbum.Name;

                int currentCustomerId = _workContext.CurrentCustomer.Id;

                videoAlbumModel.IsCurrentUsersProfile = currentCustomerId == customerId;
                

                var mainAlbumVideos = mainVideoAlbum.Videos.OrderBy(x => x.DisplayOrder);

                foreach (var video in mainAlbumVideos)
                {

                    bool alreadyLiked = _customerVideoAlbumService.VideoAlreadyLiked(video.Id, currentCustomerId);

                    var customerVideoModel = new CustomerVideoModel()
                        {
                            Id = video.Id,
                            Caption = video.Caption,
                            Url = video.VideoUrl,
                            LikeCount = video.LikeCount,
                            AlreadyLiked = alreadyLiked,
                            DateCreated = video.DateCreated,
                            DateUpdated = video.DateUpdated
                        };

                    videoAlbumModel.Videos.Add(customerVideoModel);

                }
            }

            return View("mobSocial/_CustomerVideoAlbums", videoAlbumModel);

        }

        /// <summary>
        /// Uploads picture to the specified album
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [HandleJsonError]
        public JsonResult UploadAlbumPicture(int albumId, HttpPostedFileBase pictureFile)
        {

            var album = _customerAlbumPictureService.GetCustomerAlbumById(albumId);


            if (album.Pictures.Count >= _mobSocialSettings.MaximumMainAlbumPictures)
                throw new ApplicationException("You may only upload up to " + _mobSocialSettings.MaximumMainAlbumPictures + " pictures at this time.");

            // Verify that the user selected a file
            if (pictureFile != null && pictureFile.ContentLength > 0)
            {
                // extract only the fielname
                var fileName = Path.GetFileName(pictureFile.FileName);


                string albumFolder = string.Format("~/Content/Images/Albums/{0}/{1}", 
                    album.CustomerId, albumId);

                var albumPicturePath = Path.Combine(_webHelper.MapPath(albumFolder), fileName);
                albumPicturePath = FileUtility.FilePathAddNumberIfExists(albumPicturePath, _webHelper.MapPath(albumFolder));

                var directoryPath = Path.GetDirectoryName(albumPicturePath);
                if (!Directory.Exists(directoryPath))
                    Directory.CreateDirectory(directoryPath);

                pictureFile.SaveAs(albumPicturePath);

                var thumbnailFileName = Path.GetFileNameWithoutExtension(albumPicturePath) + "-thumbnail" + Path.GetExtension(albumPicturePath);
                var thumbnailPath = Path.Combine(_webHelper.MapPath(albumFolder), thumbnailFileName);
                var thumbnailWidth = _mobSocialSettings.CustomerAlbumPictureThumbnailWidth;
                var resizedPicture = _customerAlbumPictureService.CreateThumbnailPicture(pictureFile.GetPictureBits(), thumbnailWidth, pictureFile.ContentType);

                System.IO.File.WriteAllBytes(thumbnailPath, resizedPicture);

                var albumPicture = new CustomerAlbumPicture()
                    {
                        Album = album,
                        CustomerAlbumId = albumId,
                        DateCreated = DateTime.Now,
                        DisplayOrder = 0,
                        ThumbnailUrl = thumbnailPath.Replace(Request.ServerVariables["APPL_PHYSICAL_PATH"], String.Empty),
                        Url = albumPicturePath.Replace(Request.ServerVariables["APPL_PHYSICAL_PATH"], String.Empty)
                    };

                _customerAlbumPictureService.Insert(albumPicture);

                return Json(albumPicture);

                
            }


            return Json(null);

        }



        /// <summary>
        /// Saves a customer's video to the specified album
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [HandleJsonError]
        public void SaveVideo(int videoAlbumId, string videoUrl)
        {

            var videoAlbum = _customerVideoAlbumService.GetCustomerVideoAlbumById(videoAlbumId);


            if (videoAlbum.Videos.Count >= _mobSocialSettings.MaximumMainAlbumVideos)
                throw new ApplicationException("You may only upload up to " + _mobSocialSettings.MaximumMainAlbumVideos +
                                               " videos at this time.");


            var video = new CustomerVideo()
                {
                    VideoAlbum = videoAlbum,
                    CustomerVideoAlbumId = videoAlbumId,
                    DateCreated = DateTime.Now,
                    DisplayOrder = 0,
                    VideoUrl = videoUrl
                };

            _customerVideoAlbumService.Insert(video);


        }



        /// <summary>
        /// Adds a like to a customer's video
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [HandleJsonError]
        public ActionResult AddVideoLike(int customerVideoId)
        {


            if (_workContext.CurrentCustomer.IsGuest())
                return Json(new {redirect = Url.RouteUrl("Login")}, JsonRequestBehavior.AllowGet);

            
            _customerVideoAlbumService.AddVideoLike(customerVideoId, _workContext.CurrentCustomer.Id);



            return Json(null);

        }



        /*
         * NOTE: We are not providing the ablity to dislike a video already liked, unless
         * there is good psychology or other justification. Accidental like is not frequent
         * enough to justify unliking a video. Furthermore, unliking videos can artificially
         * demote customer videos and we need to prevent malicious demotions. - Bruce Leggett
         * /// <summary>
        /// Removes a like from a customer's video
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [HandleJsonError]
        public void RemoveVideoLike(int customerVideoId)
        {
            var video = _customerVideoAlbumService.GetCustomerVideoById(customerVideoId);
            video.LikeCount--;
            _customerVideoAlbumService.Update(video);
        }*/


        /// <summary>
        /// Deletes the customer album video matching the given id.
        /// </summary>
        /// <param name="customerVideoId">Id of customer video to delete</param>
        [HttpPost]
        public void DeleteCustomerVideo(int customerVideoId)
        {

            _customerVideoAlbumService.DeleteCustomerVideo(customerVideoId);

            //TODO: Later add ability to upload videos to server (Enabled by default but can be disabled in the mobSocial Admin) 


        }




        /// <summary>
        /// Deletes the customer album picture matching the given id.
        /// </summary>
        /// <param name="customerAlbumPictureId">Id of customer album picture to delete</param>
        [HttpPost]
        public void DeleteCustomerAlbumPicture(int customerAlbumPictureId)
        {
            var picture = _customerAlbumPictureService.GetCustomerAlbumPictureById(customerAlbumPictureId);

            var picturePath = _webHelper.MapPath("~/" + picture.Url);
            var pictureFileName = Path.GetFileName(picturePath);

            var thumbPath = _webHelper.MapPath("~/" + picture.ThumbnailUrl);
            var thumbFileName = Path.GetFileName(thumbPath);

            string deletedAlbumFolder = string.Format("~/Content/Images/Albums/{0}/{1}/Deleted",
                                                      picture.Album.CustomerId, picture.CustomerAlbumId);

            deletedAlbumFolder = _webHelper.MapPath(deletedAlbumFolder);

            var deletedDirectory = new DirectoryInfo(deletedAlbumFolder);
            deletedDirectory.Create(); // If the directory already exists, nothing will happen here.

            
            // copy picture and thumb to deleted folder for archiving and historical reasons.
            FileUtility.MoveAndAddNumberIfExists(picturePath, deletedAlbumFolder);
            FileUtility.MoveAndAddNumberIfExists(thumbPath, deletedAlbumFolder);

            _customerAlbumPictureService.Delete(picture);

        }


        public ActionResult ProfilePicture(int customerId)
        {
            bool avatarEnabled = false;
            string avatarUrl = _pictureService.GetDefaultPictureUrl(_mediaSettings.AvatarPictureSize, PictureType.Avatar);
            string fullSizeAvatarUrl = _pictureService.GetDefaultPictureUrl(0, PictureType.Avatar);
            var isCurrentUser = _workContext.CurrentCustomer.Id == customerId;

            if (_customerSettings.AllowCustomersToUploadAvatars)
            {
                avatarEnabled = true;
                var customer = _customerService.GetCustomerById(customerId);
                var customerAvatarId = customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId);

                if (customerAvatarId != 0)
                {
                    avatarUrl = _pictureService.GetPictureUrl(customerAvatarId, _mediaSettings.AvatarPictureSize);
                    fullSizeAvatarUrl = _pictureService.GetPictureUrl(customerAvatarId);
                }
                else
                {
                    if (!_customerSettings.DefaultAvatarEnabled)
                        avatarEnabled = false;
                }
            }


            var model = new ProfilePictureModel()
            {
                CanEdit = isCurrentUser && _customerSettings.AllowCustomersToUploadAvatars,
                AvatarEnabled = avatarEnabled,
                AvatarUrl = avatarUrl,
                FullSizeAvatarUrl = fullSizeAvatarUrl 
            };

            return View("mobSocial/_ProfilePicture", model);

        }
/*


        public void AddPicture(alb )
        {
            
        }*/

        private void CreateSampleData()
        {
            var teamPage = new TeamPage()
            {
                CreatedBy = 1,
                CreatedOn = DateTime.Now,
                UpdatedBy = 1,
                UpdatedOn = DateTime.Now,
                Name = "SkateMob",
                Description = "SkateMob members are the #1 skaters in the world!",
                TeamPictureId = 0

            };


            _socialNetworkService.InsertTeamPage(teamPage);


            var groupPage = new GroupPage()
            {
                Name = "Soldiers",
                Description = "New and upcoming skaters",
                PayPalDonateUrl = ""

            };

            _socialNetworkService.InsertGroupPage(groupPage);


        }

      
     


    }





}
