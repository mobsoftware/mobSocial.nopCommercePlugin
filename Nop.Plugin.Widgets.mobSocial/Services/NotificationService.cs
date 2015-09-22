using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Mob.Core.Data;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class NotificationService : BaseEntityService<Notification>, INotificationService
    {
        private IWorkContext _workContext;

        public NotificationService(IMobRepository<Notification> repository, IWorkContext workContext)
            : base(repository)
        {
            _workContext = workContext;
        }
     
        public int GetFriendRequestCount(int currentCustomerId)
        {
            throw new NotImplementedException();
        }

        public void SendFriendRequestNotifications()
        {
            throw new NotImplementedException();
        }

        public void SendProductReviewNotifications()
        {
            throw new NotImplementedException();
        }

        public List<Notification> GetProductReviewNotifications(int customerId, List<int> productIds, DateTime fromDate)
        {
            return Repository.Table
                .Where(x => x.CustomerId == customerId && productIds.Contains(x.ProductId))
                .Where(x => x.LastSent >= fromDate)
                .ToList();
        }


        // TODO: Since all products are sent per customer then use only one record in the future.

        /// <summary>
        /// Inserts product review notifications for historical and regulation purposes
        /// </summary>
        /// <param name="customer"></param>
        /// <param name="unreviewedProducts"></param>
        public void UpdateProductReviewNotifications(Customer customer, List<Product> unreviewedProducts)
        {

            foreach(var product in unreviewedProducts)
            {
                var notification = Repository.Table
                    .FirstOrDefault(x => x.CustomerId == customer.Id && x.ProductId == product.Id);

                if (notification != null)
                {
                    notification.Attempts += 1;
                    notification.LastSent = DateTime.Now;

                    Repository.Update(notification);
                }
                else
                {
                    var prNotification = new Notification()
                    {
                        Attempts = 1,
                        CreatedOn = DateTime.Now,
                        LastSent = DateTime.Now,
                        CustomerId = customer.Id,
                        Name = "ProductReviewNotification",
                        ProductId = product.Id
                    };

                    Repository.Insert(prNotification);
                }

            }

           
        }


        public override List<Notification> GetAll(string Term, int Count = 15, int Page = 1)
        {
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(Term.ToLower()))
                .Skip((Page - 1) * Count)
                .Take(Count)
                .ToList();
        }
    }

}
