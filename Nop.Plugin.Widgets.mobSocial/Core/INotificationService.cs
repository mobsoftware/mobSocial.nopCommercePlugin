using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Notification service
    /// </summary>
    public interface INotificationService
    {

        int GetFriendRequestCount(int currentCustomerId);

        void SendFriendRequestNotifications();

        void SendProductReviewNotifications();


    }

}
