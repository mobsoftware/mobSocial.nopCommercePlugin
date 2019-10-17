using System;
using System.Collections.Specialized;
using Microsoft.AspNetCore.Http;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Sdk;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Events;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class CustomerRegisteredEventConsumer : IConsumer<CustomerRegisteredEvent>
    {
        private readonly IStoreContext _storeContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CustomerRegisteredEventConsumer(IStoreContext storeContext, IHttpContextAccessor httpContextAccessor)
        {
            _storeContext = storeContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public void HandleEvent(CustomerRegisteredEvent eventMessage)
        {
            //because nopCommerce hashes the password, we'll need to read the raw stream to read the password
            var password = _httpContextAccessor.HttpContext.Request.Query["Password"];
            var client = MobSocialClientHelper.NewClient();
            //register the client
            client.Register(eventMessage.Customer, password);
            
        }
    }
}