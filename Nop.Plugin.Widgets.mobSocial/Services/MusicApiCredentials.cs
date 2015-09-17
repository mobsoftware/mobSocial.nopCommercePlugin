namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class MusicApiCredentials : IOAuthCredentials
    {
        public MusicApiCredentials()
        {
            ConsumerKey = "7d27r8wn855r";
            ConsumerSecret = "rvudkp74mgwkty3y";
        }

        public string ConsumerKey { get; set; }
        public string ConsumerSecret { get; set; }
    }

}
