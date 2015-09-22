using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public class TeamPageService : BaseEntityService<TeamPage>, ITeamPageService
    {
    
        public TeamPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IMobRepository<TeamPage> teamPageRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext) : base(teamPageRepository)
        {
        }


        public override List<TeamPage> GetAll(string Term, int Count = 15, int Page = 1)
        {
            var termLowerCase = Term.ToLower();
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(termLowerCase))
                .Skip((Page - 1) * Count)
                .Take(Count)
                .ToList();
        }
    }

}

    

