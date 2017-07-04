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
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Orders;
using Nop.Services.Security;
using Nop.Services.Seo;
using Mob.Core;
using System.Web;
using mobSocial.Data.Entity.Albums;
using mobSocial.Data.Entity.GroupPages;
using mobSocial.Data.Entity.TeamPages;
using mobSocial.Data.Entity.Videos;
using mobSocial.Data.Enum;
using Nop.Web.Controllers;


namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class mobSocialController : MobSocialWidgetBaseController
    {

        private IPermissionService _permissionService;
        private readonly IWorkContext _workContext;
        private AdminAreaSettings _adminAreaSettings;
        private ILocalizationService _localizationService;
        private readonly IPictureService _pictureService;
        private readonly MediaSettings _mediaSettings;
        private readonly CustomerSettings _customerSettings;
        private readonly OrderService _orderService;
        private readonly ForumSettings _forumSettings;
        private readonly RewardPointsSettings _rewardPointsSettings;
        private readonly OrderSettings _orderSettings;
        private readonly IStoreContext _storeContext;
        private readonly ICustomerService _customerService;
        private IWebHelper _webHelper;
        private readonly IUrlRecordService _urlRecordService;
        private readonly IRepository<UrlRecord> _urlRecordRepository;

        public mobSocialController(IPermissionService permissionService,
            IWorkContext workContext, AdminAreaSettings adminAreaSettings, ILocalizationService localizationService,
            IPictureService pictureService, ICustomerService customerService,
            MediaSettings mediaSettings, CustomerSettings customerSettings, 
            ForumSettings forumSettings, RewardPointsSettings rewardPointsSettings, OrderSettings orderSettings,
             IStoreContext storeContext, IWebHelper webHelper, IUrlRecordService urlRecordService, IRepository<UrlRecord> urlRecordRepository)
        {
            _permissionService = permissionService;
            _workContext = workContext;
            _adminAreaSettings = adminAreaSettings;
            _localizationService = localizationService;
            _pictureService = pictureService;
            _customerService = customerService;
            _mediaSettings = mediaSettings;
            _customerSettings = customerSettings;
            _forumSettings = forumSettings;
            _rewardPointsSettings = rewardPointsSettings;
            _orderSettings = orderSettings;
            _storeContext = storeContext;
            _webHelper = webHelper;
            _urlRecordService = urlRecordService;
            _urlRecordRepository = urlRecordRepository;
        }


        public ActionResult ProfileInformation()
        {

            return null;
            /*
            var model = new ProfileInformationModel();

            model.NavigationModel = SessionState.Instance.CustomerNavigationModel;

            return View("mobSocial/WidgetZones/ProfileInformation", model);
            */
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
            return null;
            /*
            var model = new ConfigurationModel
                {
                    ZoneId = _mobSocialSettings.WidgetZone
                };

            model.AvailableZones.Add(new SelectListItem() { Text = "Before left side column", Value = "left_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After left side column", Value = "left_side_column_after" });
            model.AvailableZones.Add(new SelectListItem() { Text = "Before right side column", Value = "right_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After right side column", Value = "right_side_column_after" });

            return View("mobSocial/Configure", model);
            */

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



        

        

        public ActionResult MyHealth()
        {

            /*

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



            return View("mobSocial/MyHealth", model);*/
            return null;

        }




        public ActionResult FriendRequests()
        {

            return null;
            /*
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
            */

        }
     

        /// <summary>
        /// Gets the main customer album
        /// </summary>
        /// <returns></returns>
        public ActionResult CustomerAlbumMain(int customerId)
        {
            /*
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

            return View("mobSocial/_CustomerAlbumPictures", albumModel);*/
            return null;

        }



        public ActionResult FeaturedVideos()
        {
            return null;
            /*
            var model = new FeaturedVideosModel();

            var featuredVideos = _customerVideoAlbumService.GetFeaturedVideos();

            /*foreach (var video in featuredVideos)
            {

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
            */


        }

    }





}
