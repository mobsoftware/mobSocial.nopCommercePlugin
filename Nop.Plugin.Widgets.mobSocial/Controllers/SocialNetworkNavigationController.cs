using System.Web.Mvc;
using Nop.Core;
using Nop.Plugin.WebApi.MobSocial.Models;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    // TODO: Consider making a single SocialNetworkWidget Controller for displaying widgets.
    public class SocialNetworkNavigationController : BasePublicController
    {
        private readonly IMobSocialService _socialNetworkService;
        private readonly IWorkContext _workContext;

        public SocialNetworkNavigationController(IMobSocialService socialNetworkService, IWorkContext workContext)
        {
            _socialNetworkService = socialNetworkService;
            _workContext = workContext;
        }


        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
            
            var currentCustomerId = _workContext.CurrentCustomer.Id;

            int friendRequestCount = _socialNetworkService.GetFriendRequestCount(currentCustomerId);

            var model = new SocialNetworkNavigationModel();   
     
            if (friendRequestCount == 0)
                model.FriendRequestsLinkText = "Friend Requests";
            else
                model.FriendRequestsLinkText = "Friend Requests (" + friendRequestCount + ")";
            model.ProfileInformationLinkText = "Profile Info";

           return View("mobSocial/SocialNetworkNavigation/PublicInfo", model);
        }

    }
}
