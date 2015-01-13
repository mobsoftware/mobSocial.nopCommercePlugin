using System;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;
using System.Drawing;
using System.Linq;
using Nop.Services.Seo;
using Nop.Core.Domain.Seo;
using System.Collections.Generic;


namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class NotificationService : BaseService<Notification, Notification>, INotificationService
    {
        private IWorkContext _workContext;

        public NotificationService(IRepository<Notification> repository, IWorkContext workContext)
            : base(repository, workContext)
        {
            _workContext = workContext;
        }

        public override List<Notification> GetAll(string term, int count)
        {
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();
        }

        public override List<Notification> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override Notification GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
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

        public List<Notification> GetProductReviewNotifications(int customerId, List<int> productIds)
        {
            return Repository.Table
                .Where(x => x.CustomerId == customerId && productIds.Contains(x.ProductId))
                .ToList();
        }
    }

}
