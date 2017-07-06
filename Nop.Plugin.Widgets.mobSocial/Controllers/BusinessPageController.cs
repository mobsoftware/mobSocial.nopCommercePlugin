using System.Linq;
using System.Web.Mvc;
using Nop.Web.Framework.Security;
using DryIoc;
using mobSocial.Core.Infrastructure.AppEngine;
using mobSocial.Services.BusinessPages;
using mobSocial.Services.Extensions;
using mobSocial.Services.MediaServices;
using mobSocial.WebApi.Models.BusinessPages;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{

    [NopHttpsRequirement(SslRequirement.No)]
    public partial class BusinessPageController : MobSocialWidgetBaseController
    {
        
        public ActionResult Index(int id, int? page)
        {
            var model = new BusinessPageModel();
            using (mobSocialEngine.ActiveEngine.IocContainer.OpenScope(Reuse.WebRequestScopeName))
            {
                var businessService = mobSocialEngine.ActiveEngine.Resolve<IBusinessPageService>();
                var mediaService = mobSocialEngine.ActiveEngine.Resolve<IMediaService>();
                var business = businessService.Get(id);
                model.Name = business.Name;
                model.Description = business.Description;
                model.MetaDescription = business.MetaDescription;
                model.MetaKeywords = business.MetaKeywords;
                model.City = business.City;
                model.FullSizeImageUrl = mediaService.GetPictureUrl(null, returnDefaultIfNotFound: true);
                model.Address1 = business.Address1;
                model.Address2 = business.Address2;
                model.ZipPostalCode = business.ZipPostalCode;
            }
           return View("mobSocial/BusinessPage/Index", model);

        }

      


        [HttpGet]
        public ActionResult Search(string searchTerm = "")
        {
            return View("mobSocial/BusinessPage/Search", (object) searchTerm); 
        } 
    }
}
