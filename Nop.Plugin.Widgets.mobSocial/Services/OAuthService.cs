namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class OAuthService : IOAuthService
    {
        public string Uri { get; set; }
        public string SecureUri { get; set; }
        public string ConsumerKey { get; set; }
        public string ConsumerSecret { get; set; }

        public OAuthService(IApiUri apiUri, IOAuthCredentials credentials)
        {
            Uri = apiUri.Uri;
            SecureUri = apiUri.SecureUri;
            ConsumerKey = credentials.ConsumerKey;
            ConsumerSecret = credentials.ConsumerSecret;
        }

        
    }

}
