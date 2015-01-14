using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using System;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Notification service
    /// </summary>
    public interface INotificationService : IBaseService<Notification, Notification>
    {

        int GetFriendRequestCount(int currentCustomerId);

        void SendFriendRequestNotifications();

        void SendProductReviewNotifications();


        List<Notification> GetProductReviewNotifications(int customerId, List<int> productIds, DateTime fromDate);



        void UpdateProductReviewNotifications(Nop.Core.Domain.Customers.Customer customer, List<Product> unreviewedProducts);
    }

}
