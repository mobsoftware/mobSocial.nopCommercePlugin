using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Events;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class CustomerLoggedEventConsumer : IConsumer<CustomerLoggedinEvent>, IConsumer<CustomerLoggedOutEvent>
    {
        private readonly INotifyService _notifyService;

        public CustomerLoggedEventConsumer(INotifyService notifyService)
        {
            _notifyService = notifyService;
        }

        public void HandleEvent(CustomerLoggedinEvent eventMessage)
        {
            _notifyService.ResetClientToken();
        }

        public void HandleEvent(CustomerLoggedOutEvent eventMessage)
        {
            _notifyService.ResetClientToken();
        }
    }
}