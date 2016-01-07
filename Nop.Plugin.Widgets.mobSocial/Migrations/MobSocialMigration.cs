using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Data;
using Mob.Core.Migrations;
using Nop.Core.Domain.Messages;
using Nop.Core.Infrastructure;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Services;
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

            var settings = _settingService.LoadSetting<mobSocialSettings>();

            if (settings.Version >= MobSocialConstant.ReleaseVersion)
                return; // no need for any upgrade

            if (settings.Version <= 3.6m)
            {
                var _messageTemplateService = EngineContext.Current.Resolve<IMessageTemplateService>();

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
            if (settings.Version <= 3.61m)
            {
                settings.MacroPaymentsFixedPaymentProcessingFee = 5;
                settings.MicroPaymentsFixedPaymentProcessingFee = 0.05m;
                settings.MacroPaymentsPaymentProcessingPercentage = 3.5m;
                settings.MicroPaymentsPaymentProcessingPercentage = 5;

                //save distribution percentages as strings
                _settingService.SetSetting("winner_distribution_1", "100");
                _settingService.SetSetting("winner_distribution_2", "60+40");
                _settingService.SetSetting("winner_distribution_3", "45+35+20");
                _settingService.SetSetting("winner_distribution_4", "45+25+20+10");
                _settingService.SetSetting("winner_distribution_5", "40+25+20+10+5");


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
