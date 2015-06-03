using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace Nop.Plugin.Widgets.MobSocial.Helpers
{
    public class ArtistPageHelper
    {
        static string GetAPIUrl(string EndPoint, string ParameterString = "")
        {
            
            string urlFormat = "http://developer.echonest.com/api/v4/{0}?api_key={1}&{2}";
            return string.Format(urlFormat, EndPoint, Controllers.ControllerUtil.EchonestAPIKey, ParameterString);

        }

        public static bool DoesRemoteArtistExist(string Name)
        {
            //http://developer.echonest.com/docs/v4/artist.html#search
            var apiUrl = GetAPIUrl("artist/search", string.Format("name={0}&results=1", Name));
            var responseBytes = HttpHelper.ExecuteGET(apiUrl);

            if (responseBytes.Length == 0)
                return false;

            var jsonObject = (JObject) JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));
            
            return false;
            
        }

    }
}
