using System;
using Microsoft.AspNetCore.Http;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class NotifyService : INotifyService
    {
        private const string ResetTokenCookieName = "mobsocial_reset_token";
        private readonly IHttpContextAccessor _httpContextAccessor;

        public NotifyService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void ResetClientToken()
        {
            _httpContextAccessor.HttpContext.Response.Cookies.Append(ResetTokenCookieName, "1");
        }
    }
}