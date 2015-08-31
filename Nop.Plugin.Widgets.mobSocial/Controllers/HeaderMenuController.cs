using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Admin.Controllers;
using System.Linq;
using Nop.Core;
using Nop.Core.Domain.Common;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Security;
using Nop.Web.Controllers;
using Nop.Web.Models.Catalog;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class HeaderMenuController : BasePublicController
    {

        public HeaderMenuController()
        {
        }


        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
            return View("~/Plugins/Widgets.mobSocial/Views/mobSocial/HeaderMenu/PublicInfo.cshtml");
        }

    }
}
