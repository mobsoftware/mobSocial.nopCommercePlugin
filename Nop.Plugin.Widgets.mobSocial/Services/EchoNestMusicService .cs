using System;
using Mob.Core;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Services
{

    public class EchoNestMusicService : IMusicService
    {
        private IWorkContext _workContext;
        private mobSocialSettings _mobSocialSettings;
        private readonly IOAuthCredentials _credentials;
        private readonly IApiUri _apiUri;
        
        public EchoNestMusicService(IWorkContext workContext,
            mobSocialSettings mobSocialSettings,
            IOAuthCredentials credentials,
            IApiUri apiUri) 
        {
            _mobSocialSettings = mobSocialSettings;
            _workContext = workContext;
            _credentials = credentials;
            _apiUri = apiUri;
            
        }

        /// <summary>
        /// Gets the preview url for a sample of the song. 
        /// Jennifer Lopez - Jenny from the Block's track id is 19589723
        /// </summary>
        /// <param name="trackId">Track Id to get preview url for.</param>
        /// <returns></returns>
        public string GetTrackPreviewUrl(int trackId)
        {
            var url = "http://previews.7digital.com/clip/" + trackId.ToString() + "?country=US";
            var oauth = new OAuthBase();
            var previewUrl = oauth.GetSignedUrl(url, _credentials.ConsumerKey, _credentials.ConsumerSecret);
            return previewUrl;
        }

        public string GetTrackAffiliateUrl(int trackId)
        {
            var url = "https://instant.7digital.com/purchase/track/" + trackId.ToString() + "?partner=" + _mobSocialSettings.SevenDigitalPartnerId;
            return url;
        }

        public object SearchSongs(string term)
        {
            throw new NotImplementedException();
        }
    }

    

    



}
