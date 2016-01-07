
using System.Linq;
using Nop.Services.Configuration;

namespace Nop.Plugin.Widgets.MobSocial.Helpers
{
    public class PrizeDistributionHelper
    {
        public static decimal GetPrizeDistributionPercentage(int winnerPosition, int totalWinners, ISettingService _settingService)
        {
            //load the setting first
            var settingKey = string.Format("winner_distribution_{0}", totalWinners);

            var setting = _settingService.GetSetting(settingKey);
            if (setting == null)
                return 0;

            //the settings are stored in numerics with + as separator
            var values = setting.Value.Split('+');

            if (values.Length < totalWinners || winnerPosition - 1 > values.Length)
            {
                return 0;
            }

            decimal percent;
            decimal.TryParse(values[winnerPosition - 1], out percent);

            return percent / 100;


        }
    }
}