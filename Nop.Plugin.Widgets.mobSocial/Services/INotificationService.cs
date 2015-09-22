using System;
using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Notification service
    /// </summary>
    public interface INotificationService : IBaseEntityService<Notification>
    {

        int GetFriendRequestCount(int currentCustomerId);

        void SendFriendRequestNotifications();

        void SendProductReviewNotifications();


        List<Notification> GetProductReviewNotifications(int customerId, List<int> productIds, DateTime fromDate);



        void UpdateProductReviewNotifications(Nop.Core.Domain.Customers.Customer customer, List<Product> unreviewedProducts);
    }

}
