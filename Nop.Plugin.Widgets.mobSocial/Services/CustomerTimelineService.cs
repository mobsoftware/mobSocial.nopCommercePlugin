using System;
using System.Collections.Generic;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerTimelineService : BaseService<CustomerTimeline, CustomerTimeline>
    {

        public CustomerTimelineService(
            IRepository<CustomerTimeline> customerTimelineRepository)
            : base(customerTimelineRepository)
        {
        }

        public override List<CustomerTimeline> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }


        public override List<CustomerTimeline> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override CustomerTimeline GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }




        public override Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }

}
