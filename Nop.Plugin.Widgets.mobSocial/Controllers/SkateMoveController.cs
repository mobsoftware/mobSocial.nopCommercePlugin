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

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SkateMoveController : BasePublicController
    {
        private readonly IMobSocialService _socialNetworkService;
        private readonly mobSocialSettings _socialNetworkSettings;

        public SkateMoveController(IMobSocialService socialNetworkService, mobSocialSettings socialNetworkSettings)
        {
            _socialNetworkService = socialNetworkService;
            _socialNetworkSettings = socialNetworkSettings;
        }


        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
           throw new NotImplementedException();
        }

        
        public ActionResult Configure()
        {

            var model = new ConfigurationModel
                {
                    ZoneId = _socialNetworkSettings.WidgetZone
                };

            model.AvailableZones.Add(new SelectListItem() { Text = "Before left side column", Value = "left_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After left side column", Value = "left_side_column_after" });
            model.AvailableZones.Add(new SelectListItem() { Text = "Before right side column", Value = "right_side_column_before" });
            model.AvailableZones.Add(new SelectListItem() { Text = "After right side column", Value = "right_side_column_after" });
           
            return View("Nop.Plugin.Widgets.mobSocial.Views.SocialNetwork.Configure", model);

        }


       



    }
}
