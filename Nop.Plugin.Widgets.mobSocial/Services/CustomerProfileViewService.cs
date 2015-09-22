using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerProfileViewService : BaseEntityService<CustomerProfileView>
    {
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly IWorkContext _workContext;

        public CustomerProfileViewService(
            IMobRepository<CustomerProfileView> customerProfileViewRepository,
            IWorkContext workContext,
            mobSocialSettings mobSocialSettings)
            : base(customerProfileViewRepository)
        {
            _mobSocialSettings = mobSocialSettings;
            _workContext = workContext;
        }

        public void IncrementViewCount(int customerId) {
            
            var currentCustomer = _workContext.CurrentCustomer;

            var viewerViewCount = Repository.Table
                .FirstOrDefault(x => x.CustomerId == customerId && x.ViewerCustomerId == currentCustomer.Id);

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
       
        public override List<CustomerProfileView> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }

}
