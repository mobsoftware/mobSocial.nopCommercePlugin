using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core.Caching;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Catalog;
using Nop.Services.Configuration;
using Nop.Core;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Core.Domain.Media;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Product service
    /// </summary>
    public class TeamPageService : BaseService<TeamPage, TeamPage>
    {
    
        public TeamPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IRepository<TeamPage> eventPageRepository,
            IRepository<TeamPage> eventPagePictureRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext) : base(eventPageRepository, eventPagePictureRepository, workContext, urlRecordService)
        {
        }



        public override List<TeamPage> GetAll(string term, int count)
        {
            var termLowerCase = term.ToLower();
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(termLowerCase))
                .Take(count)
                .ToList();

        }


        public override List<TeamPage> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override TeamPage GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
        


    }

}

    

