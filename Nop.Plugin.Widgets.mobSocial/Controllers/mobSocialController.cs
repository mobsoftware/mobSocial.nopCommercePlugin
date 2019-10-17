using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Sdk;


namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    
    public class MobSocialController : MobSocialWidgetBaseController
    {

        private readonly IWorkContext _workContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MobSocialController(IWorkContext workContext, IHttpContextAccessor httpContextAccessor)
        {
            _workContext = workContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public IActionResult Index()
        {
            return View("mobSocial/Social/Index");
        }

        [HttpPost]
        public IActionResult AccessToken()
        {
            //get the token
            var customer = _workContext.CurrentCustomer;
            var accessToken = MobSocialClientHelper.NewClient().AccessToken(customer?.Email);
            _httpContextAccessor.HttpContext.Response.Cookies.Append(".MobSocial.ApiAuthentication", accessToken, new CookieOptions()
            {
                Domain = MobSocialClient.Domain,
                HttpOnly = false
            });
            if (customer.IsGuest())
            {
                //prefix with app_ to identify if it's app only token
                accessToken = "app_" + accessToken;
            }
            return Json(new {success = true, access_token = accessToken});
        }
    }





}
