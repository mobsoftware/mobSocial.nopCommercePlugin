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

        public override CustomerTimeline GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }



    }

}
