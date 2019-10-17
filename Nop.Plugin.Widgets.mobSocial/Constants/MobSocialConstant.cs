using System;

namespace Nop.Plugin.Widgets.MobSocial.Constants
{
    public class MobSocialConstant
    {
        public static bool SuiteInstallation = false; // Convert.ToBoolean(ConfigurationManager.AppSettings["suiteInstall"] ?? "false");

        public static string PluginPath = "~/Plugins" + (SuiteInstallation ? "/MobSocial.Suite" : "/Widgets.mobSocial");

        public static string ViewsPath = PluginPath + "/Views";

        public static string PluginContentPath = PluginPath + "/Content";
        public static string PluginContentPathInternal = PluginContentPath + "/mobSocial";
        public static string ThirdPartyLibraryPath = PluginContentPath + "/Libraries";

        public static string ThemePath = PluginPath + "/Themes/MobSocialDefault";
        public static string ThemeContentPath = ThemePath + "/Content";

        public static string EncryptionKeyName = "encryptionkey";
        public static string VideoBattleVoterPassSKU = "MobSocialVideoBattleVoterPass";
        public static string PictureBattleVoterPassSKU = "MobSocialPictureBattleVoterPass";
        public static string SponsorPassSKU = "MobSocialSponsorPass";

        public static string EncryptionKeyDefault = "25E85C9D339FCFE1FB6E12FE98816";
        public static string EncryptionSalt = "428B648F262C4E2BC2637DD445D37";

        public static string VideoBattleFeaturedImageUrl = PluginContentPathInternal + "/images/poweredby.jpg";

        public static decimal ReleaseVersion = 1.1m;

        public static string MobSocialMediaPath = PluginContentPath + "/uploads";
        public static string MobSocialPicturePath = MobSocialMediaPath + "/pictures";
        public static string MobSocialVideoPath = MobSocialMediaPath + "/videos";

        public static bool IsMobSocialPage = false;
    }
}

