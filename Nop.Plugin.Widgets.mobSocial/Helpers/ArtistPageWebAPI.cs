using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Specialized;
namespace Nop.Plugin.Widgets.MobSocial.Helpers
{
    public class ArtistPageWebAPI
    {
        /// <summary>
        /// Returns the API url. 
        /// </summary>
        /// <param name="EndPoint">The API endpoint e.g. artist/similar </param>
        /// <param name="ParameterString">Any additional parameter string to be passed to the api</param>
        /// <returns></returns>
        static string GetAPIUrl(string EndPoint, string ParameterString = "")
        {
            
            string urlFormat = "http://developer.echonest.com/api/v4/{0}?api_key={1}&format=json&{2}";
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

            return jsonObject["response"]["artists"].Count() > 0;
            
        }

        /// <summary>
        /// Returns remote artist as JSON string
        /// </summary>
        /// <param name="Name">The name of artist</param>
        public static string GetRemoteArtist(string Name)
        {
            //http://developer.echonest.com/docs/v4/artist.html#profile
            var apiUrl = GetAPIUrl("artist/profile", string.Format("name={0}&bucket=biographies&bucket=artist_location&bucket=images&bucket=songs&bucket=years_active" , Name));

            var responseBytes = HttpHelper.ExecuteGET(apiUrl);
            if (responseBytes.Length == 0)
                return string.Empty;
            var jsonObject = (JObject)JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));

            //create a generic object so that we can replace the api easily if required
            
            var artist = jsonObject["response"]["artist"];
            string name = artist["name"].ToString();
            string imageUrl = "";

            if (artist["images"].Count() > 0)
            {

                imageUrl = artist["images"][0]["url"].ToString(); //first url in sequence
            }

            string years_active = "";
            if (artist["years_active"].Count() > 0)
            {
                years_active = artist["years_active"][0]["start"].ToString(); //first year in sequence
            }

            string biography = "";
            if (artist["biographies"].Count() > 0)
            {
                //find first data biography
                biography = artist["biographies"][0]["text"].ToString();
            }


            string location = artist["artist_location"]["location"].ToString();
            string remoteEntityId = artist["id"].ToString();
            //create a new json object which will be converted to string

            var responseObject = JObject.FromObject(new {
                Name = name,
                Description = biography,
                ImageUrl = imageUrl,
                HomeTown = location,
                ActiveSince = years_active,
                RemoteEntityId = remoteEntityId,
                RemoteSourceName = "EchoNest",
                Gender = ""
            });

            return responseObject.ToString(Formatting.None);
        }

        /// <summary>
        /// Gets related artists based on current artists
        /// </summary>
        /// <param name="RemoteEntityId">The entity id of artist on remote server. We store it in Artist.RemoteEntityId</param>
        /// <param name="Count">Maximum number of results to be returned</param>
        public static NameValueCollection GetRelatedArtists(string RemoteEntityId, int Count = 5)
        {
            //http://developer.echonest.com/docs/v4/artist.html#similar
            var apiUrl = GetAPIUrl("artist/similar", string.Format("name={0}&results={1}", RemoteEntityId, Count));

            var responseBytes = HttpHelper.ExecuteGET(apiUrl);
            if (responseBytes.Length == 0)
                return null;
            var jsonObject = (JObject)JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));

            var relatedArtists = new NameValueCollection();
            for (int index = 0; index < jsonObject["artists"].Count(); index++)
            {
                var artist = jsonObject["artists"][index];
                relatedArtists.Add(artist["id"].ToString(), artist["name"].ToString());
            }

            return relatedArtists;
        }

    }
}
