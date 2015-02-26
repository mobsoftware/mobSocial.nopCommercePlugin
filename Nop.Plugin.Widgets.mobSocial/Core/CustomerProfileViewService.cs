using System;
using System.Collections.Generic;
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


namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class CustomerProfileViewService : BaseService<CustomerProfileView, CustomerProfileView>
    {
        private readonly mobSocialSettings _mobSocialSettings;

        public CustomerProfileViewService(
            IRepository<CustomerProfileView> customerProfileViewRepository,
            IWorkContext workContext,
            mobSocialSettings mobSocialSettings)
            : base(customerProfileViewRepository, workContext)
        {
            _mobSocialSettings = mobSocialSettings;
        }

        public void IncrementViewCount(int customerId) {
            
            var currentCustomer = WorkContext.CurrentCustomer;

            var viewerViewCount = Repository.Table
                .Where(x => x.CustomerId == customerId && x.ViewerCustomerId == currentCustomer.Id)
                .FirstOrDefault();

            if (viewerViewCount != null)
            {
                var secondsSinceLastUpdated = (DateTime.Now - viewerViewCount.DateUpdated).TotalSeconds;
                if (secondsSinceLastUpdated >= _mobSocialSettings.CustomerProfileUpdateViewCountAfterNumberOfSeconds)
                {
                    viewerViewCount.Views++;
                    viewerViewCount.DateUpdated = DateTime.Now;
                    Repository.Update(viewerViewCount);
                }

            }
            else
            {
                var customerProfileView = new CustomerProfileView()
                {
                    CustomerId = customerId,
                    ViewerCustomerId = currentCustomer.Id,
                    Views = 1,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now
                };
                Repository.Insert(customerProfileView);

            }






        }

        public int GetViewCount(int customerId)
        {
            var viewCount = Repository.Table
                .Where(x => x.CustomerId == customerId)
                .Sum(x=> x.Views);

            return viewCount;
        }

        public override List<CustomerProfileView> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }


        public override List<CustomerProfileView> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override CustomerProfileView GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }




        public override Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }

}
