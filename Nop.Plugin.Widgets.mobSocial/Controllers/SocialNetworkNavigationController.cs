using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Admin.Controllers;
using System.Linq;
using Nop.Core;
using Nop.Core.Domain.Common;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Security;
using Nop.Web.Controllers;
using Nop.Web.Framework;

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

           return View(model);
        }

    }
}
