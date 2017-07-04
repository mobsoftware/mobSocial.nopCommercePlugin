using System.Web.Mvc;
using DryIoc;
using mobSocial.Core.Infrastructure.AppEngine;
using mobSocial.Services.Social;
using mobSocial.WebApi.Configuration.Infrastructure;
using Nop.Core;
using Nop.MobSocial.WebApi.Services;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    // TODO: Consider making a single SocialNetworkWidget Controller for displaying widgets.
    public class SocialNetworkNavigationController : MobSocialWidgetBaseController
    {
        private IFriendService _friendService;
        private readonly IWorkContext _workContext;
        public SocialNetworkNavigationController(IWorkContext workContext)
        {
            _workContext = workContext;
        }

        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
            int friendRequestCount = 0;
            //todo: remove this call and move this to client to api call directly
            try
            {
                using (mobSocialEngine.ActiveEngine.IocContainer.OpenScope(Reuse.WebRequestScopeName))
                {
                    _friendService =
                        mobSocialEngine.ActiveEngine.Resolve<IFriendService>(); //resolved from webapi standalone

                    var currentCustomerId = _workContext.CurrentCustomer.Id;
                    friendRequestCount = _friendService.GetFriendRequests(currentCustomerId).Count;
                }
            }
            catch
            {
                //container disposed might be?
            }
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
