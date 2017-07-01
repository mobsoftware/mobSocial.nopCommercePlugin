using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Forums;
using Nop.Core.Domain.Media;
using Nop.Services.Customers;
using Nop.Services.Directory;
using Nop.Services.Forums;
using Nop.Services.Helpers;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Seo;
using Nop.Web.Framework.Security;
using Nop.Web.Controllers;
using System.Linq;
using mobSocial.Services.BusinessPages;
using Nop.Core;
using Nop.Web.Models.Media;
using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class BusinessPageController : BasePublicController
    {
        
        public ActionResult Index(int? id, int? page)
        {

           return View("mobSocial/BusinessPage/Index");

        }

      


        [HttpGet]
        public ActionResult Search(string searchTerm = "")
        {
            return View("mobSocial/BusinessPage/Search", (object) searchTerm); 
        } 
    }
}
