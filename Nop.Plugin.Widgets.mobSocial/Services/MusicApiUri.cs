namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class MusicApiUri : IApiUri
    {
        public string Uri
        {
            get { return "http://api.7digital.com/1.2"; }
        }

        public string SecureUri
        {
            get { return "https://api.7digital.com/1.2"; }
        }
    }

}
