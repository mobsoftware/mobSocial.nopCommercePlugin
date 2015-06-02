using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Nop.Core.Caching;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class ArtistPageAPIService: IArtistPageAPIService
    {
        private mobSocialSettings _mobsocialSettings;
        private ICacheManager _cacheManager;

        public ArtistPageAPIService(mobSocialSettings mobSocialSettings, ICacheManager cacheManager)
        {
            _mobsocialSettings = mobSocialSettings;
            _cacheManager = cacheManager;
        }
        /// <summary>
        /// Returns the API url. 
        /// </summary>
        /// <param name="EndPoint">The API endpoint e.g. artist/similar </param>
        /// <param name="ParameterString">Any additional parameter string to be passed to the api</param>
        /// <returns>The formatted URI for api call</returns>
        string GetAPIUrl(string EndPoint, string ParameterString = "")
        {

            string urlFormat = "http://developer.echonest.com/api/v4/{0}?api_key={1}&format=json&{2}";
            return string.Format(urlFormat, EndPoint, _mobsocialSettings.EchonestAPIKey, ParameterString);

        }

        public bool DoesRemoteArtistExist(string Name)
        {
            //http://developer.echonest.com/docs/v4/artist.html#search
            var apiUrl = GetAPIUrl("artist/search", string.Format("name={0}&results=1", Name));
            var responseBytes = HttpHelper.ExecuteGET(apiUrl);

            if (responseBytes == null || responseBytes.Length == 0)
                return false;

            var jsonObject = (JObject)JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));

            return jsonObject["response"]["artists"].Count() > 0;

        }

        /// <summary>
        /// Returns remote artist as JSON string
        /// </summary>
        /// <param name="Name">The name of artist</param>
        public string GetRemoteArtist(string Name)
        {
            //http://developer.echonest.com/docs/v4/artist.html#profile
            var apiUrl = GetAPIUrl("artist/profile", string.Format("name={0}&bucket=biographies&bucket=artist_location&bucket=images&bucket=songs&bucket=years_active", Name));

            var responseBytes = HttpHelper.ExecuteGET(apiUrl);
            if (responseBytes == null || responseBytes.Length == 0)
                return null;
            var jsonObject = (JObject)JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));

            //create a generic object so that we can replace the api easily if required

            var artist = jsonObject["response"]["artist"];
            return ParseEchonestArtist(artist);           
        }

        /// <summary>
        /// Gets related artists based on current artists
        /// </summary>
        /// <param name="RemoteEntityId">The entity id of artist on remote server. We store it in Artist.RemoteEntityId</param>
        /// <param name="Count">Maximum number of results to be returned</param>
        public IList<string> GetRelatedArtists(string RemoteEntityId, int Count = 5)
        {
            //http://developer.echonest.com/docs/v4/artist.html#similar
            var apiUrl = GetAPIUrl("artist/similar", string.Format("name={0}&bucket=biographies&bucket=artist_location&bucket=images&bucket=songs&bucket=years_active&results={1}", RemoteEntityId, Count));

            var responseBytes = HttpHelper.ExecuteGET(apiUrl);
            if (responseBytes== null || responseBytes.Length == 0)
                return null;
            var jsonObject = (JObject)JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));

            var relatedArtists = new List<string>();
            for (int index = 0; index < jsonObject["response"]["artists"].Count(); index++)
            {
                var artist = jsonObject["response"]["artists"][index];
               
                relatedArtists.Add(ParseEchonestArtist(artist));
            }

            return relatedArtists;
        }


        public IList<string> SearchArtists(string Term, int Count = 15, int Page = 1)
        {
            //TODO: Use a dedicated cache system for our artist page
            string CACHE_KEY = string.Format("MOBSOCIAL_SEARCH_{0}_COUNT_{1}_PAGE_{2}", Term, Count, Page);
            return _cacheManager.Get(CACHE_KEY, 24 * 60, () => //cache for 24 hours
            {
                //http://developer.echonest.com/docs/v4/artist.html#search
                var apiUrl = GetAPIUrl("artist/search", string.Format("name={0}&bucket=images&start={1}&results={2}", Term, (Count * (Page - 1)), Count));

                var responseBytes = HttpHelper.ExecuteGET(apiUrl);
                if (responseBytes == null || responseBytes.Length == 0)
                    return null;
                var jsonObject = (JObject)JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));
                var searchResults = new List<string>();

                for (int index = 0; index < jsonObject["response"]["artists"].Count(); index++)
                {
                    var artist = jsonObject["response"]["artists"][index];

                    searchResults.Add(ParseEchonestArtist(artist));
                }
                return searchResults;
            });           

        }

        public IList<string> GetArtistSongs(string ArtistName, int Count = 15, int Page = 1)
        {
            //http://developer.echonest.com/docs/v4/song.html#search
            var apiUrl = GetAPIUrl("song/search", string.Format("artist={0}&bucket=id:7digital-US&bucket=tracks&start={1}&results={2}", ArtistName, (Count * (Page - 1)), Count));

            var responseBytes = HttpHelper.ExecuteGET(apiUrl);
            if (responseBytes == null || responseBytes.Length == 0)
                return null;
            var jsonObject = (JObject)JsonConvert.DeserializeObject(Encoding.ASCII.GetString(responseBytes));
            var songsResults = new List<string>();

            for (int index = 0; index < jsonObject["response"]["songs"].Count(); index++)
            {
                var song = jsonObject["response"]["songs"][index];
                if(song["tracks"] != null && song["tracks"].Count() > 0)
                {
                    //only songs which have tracks should be taken
                    for (int subindex = 0; subindex < song["tracks"].Count(); subindex++)
                    {
                        var track = song["tracks"][subindex];
                        songsResults.Add(ParseEchonestTrack(track, song["title"].ToString()));
                    }
                    
                }
                
            }
            return songsResults;
        }


        /// <summary>
        /// Parses echonest json artist data to a generic artist json data. Can have different implementation for a different API
        /// </summary>
        /// <param name="artist"></param>
        /// <returns></returns>
        string ParseEchonestArtist(JToken artist)
        {
            string name = artist["name"].ToString();
            string imageUrl = "";

            if (artist["images"].Count() > 0)
            {

                imageUrl = artist["images"][0]["url"].ToString(); //first url in sequence
            }

            string years_active = "";
            if (artist["years_active"]!=null && artist["years_active"].Count() > 0)
            {
                years_active = artist["years_active"][0]["start"].ToString(); //first year in sequence
            }

            string biography = "";
            if (artist["biographies"] !=null && artist["biographies"].Count() > 0)
            {
                //find first data biography
                biography = artist["biographies"][0]["text"].ToString();
            }
            string location = "";
            if (artist["artist_location"] != null)
            {
                location = artist["artist_location"]["location"].ToString();
            }
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
                Gender = "",
                ShortDescription = ""
            });
            return responseObject.ToString(Formatting.None);
        }

        /// <summary>
        /// Parses echonest json track data to a generic track json data. Can have different implementation for a different API
        /// </summary>        
        string ParseEchonestTrack(JToken track, string title)
        {
            string imageUrl = "";
            string previewUrl = "";
            string foreignId = "::";//safe initialization: TODO: put a check below for the same
            string foreignReleaseId = "::";

            string id = track["id"].ToString();
            if (track["release_image"] != null)
            {
                imageUrl = track["release_image"].ToString();
            }


            if (track["preview_url"] != null)
            {
                previewUrl = track["preview_url"].ToString();
            }


            if (track["foreign_id"] != null)
            {
                foreignId = track["foreign_id"].ToString();
            }
            if (track["foreign_release_id"] != null)
            {
                foreignReleaseId = track["foreign_release_id"].ToString();
            }

            if (track["id"] != null)
            {
                id = track["id"].ToString();
            }

            var responseObject = JObject.FromObject(new
                  {
                      Id = id,
                      Name = title,
                      ImageUrl = imageUrl,
                      PreviewUrl = previewUrl,
                      ForeignId = foreignId,
                      TrackId = foreignId.Split(':')[2],  //7digital-US:track:3890387
                      ReleaseId = foreignReleaseId.Split(':')[2]
                  });

            return responseObject.ToString(Formatting.None);
        }


    }
}
