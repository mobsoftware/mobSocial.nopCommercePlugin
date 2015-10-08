using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Data;

namespace Nop.Plugin.Widgets.MobSocial.Migrations
{
    public class MigrationsContextFactory : IDbContextFactory<MobSocialObjectContext>
    {
        public MobSocialObjectContext Create()
        {
            var dataSettingsManager = new DataSettingsManager();
            DataSettings dataSettings = dataSettingsManager.LoadSettings();
            return new MobSocialObjectContext(dataSettings.DataConnectionString);
        }
    }
}
