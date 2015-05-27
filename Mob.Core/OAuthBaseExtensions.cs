using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Mob.Core
{
    /// <summary>
    /// OAuthBase Extension methods to keep the original OAuthBase class closed from modifications.
    /// </summary>
    public static class OAuthBaseExtensions
    {
        /// <summary>
        /// Gets a signed url from the request url
        /// </summary>
        /// <returns>Signed url generated from requestUrl</returns>
        public static string GetSignedUrl(this OAuthBase oauthBase, string requestUrl, string consumerKey, string consumerSecret)
        {
            string normalizedUrl;
            string normalizedParameters;

            var signature = HttpUtility.UrlEncode(
                oauthBase.GenerateSignature(
                        new Uri(requestUrl),
                        consumerKey,
                        consumerSecret,
                        null,
                        null,
                        "GET",
                        oauthBase.GenerateTimeStamp(),
                        oauthBase.GenerateNonce(),
                        out normalizedUrl,
                        out normalizedParameters
                    )
                );

            var signedUrl = normalizedUrl + "?" + normalizedParameters + "&oauth_signature=" + signature;
            return signedUrl;
        }

    }
}
