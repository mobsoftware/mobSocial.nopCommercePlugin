using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Migrations;
using Nop.Core.Domain.Messages;
using Nop.Core.Infrastructure;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Messages;

namespace Nop.Plugin.Widgets.MobSocial.Migrations
{
    public class MobSocialMigration : IStartupTask
    {
       
        public void RunCustomMigration()
        {
            //here we include the code that'll run each time something needs to be upgraded to existing installation
            //we keep track of upgrades by version numbers
            //so first get the version number
            var _settingService = EngineContext.Current.Resolve<ISettingService>();
            var _messageTemplateService = EngineContext.Current.Resolve<IMessageTemplateService>();

            var settings = _settingService.LoadSetting<mobSocialSettings>();

            if (settings.Version >= MobSocialConstant.ReleaseVersion)
                return; // no need for any upgrade

            if (settings.Version <= 3.6m)
            {
                var sponsorAppliedNotification = new MessageTemplate() {
                    Name = "MobSocial.SponsorAppliedNotification",
                    Subject = "%Sponsor.Name% wants to sponsor %Battle.Title%!",
                    Body = "Visit <a href=\"%SponsorDashboard.Url%\">Sponsor Dashboard</a> to accept the sponsorship.",
                    EmailAccountId = 1,
                    IsActive = true,
                    LimitedToStores = false
                };

                _messageTemplateService.InsertMessageTemplate(sponsorAppliedNotification);

                var sponsorshipStatusChangeNotification = new MessageTemplate() {
                    Name = "MobSocial.SponsorshipStatusChangeNotification",
                    Subject = "Sponsorship for %Battle.Title% has been %Sponsorship.Status%",
                    Body = "Visit <a href=\"%SponsorDashboard.Url%\">Sponsor Dashboard</a> to view the details.",
                    EmailAccountId = 1,
                    IsActive = true,
                    LimitedToStores = false
                };

                _messageTemplateService.InsertMessageTemplate(sponsorshipStatusChangeNotification);
               
            }
            //and update the setting
            settings.Version = MobSocialConstant.ReleaseVersion;
            _settingService.SaveSetting(settings);
            _settingService.ClearCache();
           
        }

        public void Execute()
        {
            RunCustomMigration();
        }

        public int Order
        {
            get { return 0; }
        }
    }
}
