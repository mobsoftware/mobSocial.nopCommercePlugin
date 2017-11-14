using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using DotNetOpenAuth.AspNet;
using Newtonsoft.Json;
using Nop.Plugin.ExternalAuth.mobSocial.Core;

namespace Nop.Plugin.ExternalAuth.mobSocial.Sdk
{
    public class MobSocialClient
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        public MobSocialClient(string clientId, string clientSecret)
        {
            _clientId = clientId;
            _clientSecret = clientSecret;
        }

        public AuthenticationResult VerifyAuthentication(HttpContextBase httpContext, Uri callbackUri)
        {
            var code = httpContext.Request.QueryString["code"];
            if(string.IsNullOrEmpty(code))
                return new AuthenticationResult(false);

            var url = MobSocialLoginGlobals.AccessTokenUrl;
            var args = new Dictionary<string, string>
            {
                {"client_id", _clientId},
                {"client_secret", _clientSecret},
                {"redirect_uri", callbackUri.AbsoluteUri},
                {"grant_type", "authorization_code" },
                {"code", code }
            };
            var queryString = CreateQueryString(args);
            var authorization =
                Convert.ToBase64String(Encoding.UTF8.GetBytes($"{_clientId}:{_clientSecret}"));
            var headerAuthorization = $"Basic {authorization}";
            var headers = new Dictionary<string, string>()
            {
                { "Authorization", headerAuthorization }
            };
            var response = SendProxyRequest(url + "?" + queryString, "POST", args, headers);
            if (string.IsNullOrEmpty(response))
                return AuthenticationResult.Failed;
            dynamic responseObject = JsonConvert.DeserializeObject(response);
            string accessToken = responseObject.access_token;
            var user = GetUserInfo(accessToken);
            if (user == null)
                return AuthenticationResult.Failed;
            var authResult = new AuthenticationResult(true, Provider.SystemName, (string) user.Id, (string) user.Name,
                new Dictionary<string, string>
                {
                    { "Email", (string) user.Email },
                    { "UserName", (string) user.UserName },
                    { "FirstName", (string) user.FirstName },
                    { "LastName", (string) user.LastName },
                    { "ProfileImageUrl", (string) user.ProfileImageUrl },
                    { "CoverImageUrl", (string) user.CoverImageUrl },
                    { "access_token", accessToken}
                });
            return authResult;
        }

        private dynamic GetUserInfo(string accessToken)
        {
            var headers = new Dictionary<string, string>()
            {
                { "Authorization", $"Bearer {accessToken}" }
            };
            var url = MobSocialLoginGlobals.GetCurrentUserUrl;
            var response = SendProxyRequest(url, "GET", null, headers);
            if (string.IsNullOrEmpty(response))
                return null;

            dynamic responseObject = JsonConvert.DeserializeObject(response);
            if (responseObject.Success == "True")
            {
                return responseObject.ResponseData.User;
            }
            return null;
        }

        private string SendProxyRequest(string url, string method, Dictionary<string, string> parameters = null, Dictionary<string, string> headers = null)
        {
            using (var webClient = new WebClient())
            {
                try
                {
                    byte[] resBytes;
                    if (headers != null)
                    {
                        foreach (var kp in headers)
                        {
                            webClient.Headers[kp.Key] = kp.Value;
                        }
                    }
                    if (method == "GET")
                        resBytes = webClient.DownloadData(url);
                    else
                    {
                        var nvp = parameters?.Aggregate(new NameValueCollection(),
                                      (seed, current) => {
                                          seed.Add(current.Key, current.Value);
                                          return seed;
                                      }) ?? new NameValueCollection();
                        resBytes = webClient.UploadValues(url, method, nvp);
                    }
                   
                    var result = Encoding.UTF8.GetString(resBytes);
                    return result;
                }
                catch (Exception e)
                {
                    return null;
                }
            }
        }

        private string CreateQueryString(IEnumerable<KeyValuePair<string, string>> args)
        {
            if (!args.Any())
            {
                return string.Empty;
            }
            var builder = new StringBuilder();
            foreach (KeyValuePair<string, string> pair in args)
            {
                builder.Append(EscapeUriDataStringRfc3986(pair.Key));
                builder.Append('=');
                builder.Append(EscapeUriDataStringRfc3986(pair.Value));
                builder.Append('&');
            }
            builder.Length--;
            return builder.ToString();
        }

        private readonly string[] UriRfc3986CharsToEscape = new string[] { "!", "*", "'", "(", ")" };
        private string EscapeUriDataStringRfc3986(string value)
        {
            var builder = new StringBuilder(Uri.EscapeDataString(value));
            for (int i = 0; i < UriRfc3986CharsToEscape.Length; i++)
            {
                builder.Replace(UriRfc3986CharsToEscape[i], Uri.HexEscape(UriRfc3986CharsToEscape[i][0]));
            }
            return builder.ToString();
        }
    }
}
