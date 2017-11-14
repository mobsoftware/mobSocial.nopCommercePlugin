namespace Nop.Plugin.ExternalAuth.mobSocial
{
    public static class MobSocialLoginGlobals
    {
        public const string MobSocialServerUrl = "http://mobsocial.com";

        public const string AuthUrl = MobSocialServerUrl + "/api/oauth2/authorize";

        public const string AccessTokenUrl = MobSocialServerUrl + "/api/oauth2/token";

        public const string GetCurrentUserUrl = MobSocialServerUrl + "/api/users/get/me?includeEmail=true";
    }
}
