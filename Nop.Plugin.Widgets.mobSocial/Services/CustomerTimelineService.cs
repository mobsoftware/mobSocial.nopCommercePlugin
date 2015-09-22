using System;
using System.Collections.Generic;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerTimelineService : BaseEntityService<CustomerTimeline>
    {

        public CustomerTimelineService(
            IMobRepository<CustomerTimeline> customerTimelineRepository)
            : base(customerTimelineRepository)
        {
        }

        public override List<CustomerTimeline> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }

}
