using Microsoft.AspNetCore.Mvc;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Web.Framework.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class OAuthController : BaseController
    {
        private readonly IWorkContext _workContext;
        public OAuthController(IWorkContext workContext)
        {
            _workContext = workContext;
        }

        [HttpGet]
        public IActionResult GetAccessToken()
        {
            //create a new client
            var client = MobSocialClientHelper.NewClient();
            //find mobsocial user id for current customer
            if (_workContext.CurrentCustomer.IsGuest())
            {
                return Unauthorized();
            }
            var accessToken = client.AccessToken(_workContext.CurrentCustomer.Email);
            return Json(new {success = true, accessToken = accessToken});
        }
    }
}