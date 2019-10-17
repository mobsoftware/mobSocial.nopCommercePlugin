using System;
using System.Collections.Specialized;
using System.Net;
using Newtonsoft.Json;
using Nop.Core.Domain.Customers;
using Nop.Core.Infrastructure;
using Nop.Services.Common;

namespace Nop.Plugin.Widgets.MobSocial.Sdk
{
    public class MobSocialClient
    {
        #region Constants


#if DEBUG
        public const string Domain = "localhost";
        public const string ServerUrl = "http://localhost:15536"; // "https://mobsocial.co"; // "http://nop39.localhost.com";
#else
        public const string Domain = "mobsocial.co";
        public const string ServerUrl = "https://mobsocial.co";
#endif
        public const string ApiEndPoint = ServerUrl + "/api";

        public const string VerifyUrl = ServerUrl + "/oauth/verify?mobSocialUserId={0}&redirectUrl={1}";
        #endregion

        private readonly string _clientId;
        private readonly string _clientSecret;
        public MobSocialClient(string clientId, string clientSecret)
        {
            _clientId = clientId;
            _clientSecret = clientSecret;
        }

        public string AccessToken(string email)
        {
            var url = MakeEndpointUrl("/authentication/token");
            var parameters = GetNewParameterCollection();
            parameters.Add("userEmail", email);
            var response = SendRequestImpl<dynamic>(url, "POST", parameters);
            return response?.ResponseData?.accessToken;
        }

        public MobSocialResponse Register(Customer customer, string rawPassword)
        {
            var url = MakeEndpointUrl("/authentication/register2");
            var parameters = GetNewParameterCollection();
            var genericAttributeService = EngineContext.Current.Resolve<IGenericAttributeService>();
            
            parameters.Add("firstName", genericAttributeService.GetAttribute<string>(customer, NopCustomerDefaults.FirstNameAttribute));
            parameters.Add("lastName", genericAttributeService.GetAttribute<string>(customer, NopCustomerDefaults.LastNameAttribute));
            parameters.Add("email", customer.Email);
            parameters.Add("password", rawPassword);
            parameters.Add("confirmPassword", rawPassword);
            parameters.Add("agreement", "true");
            return SendPost(url, parameters);
        }

        #region Helpers
        private string MakeEndpointUrl(string url)
        {
            return ApiEndPoint + url;
        }

        private MobSocialResponse SendGet(string url, NameValueCollection parameters)
        {
            return SendRequest(url, "GET", parameters);
        }

        private MobSocialResponse SendPost(string url, NameValueCollection parameters)
        {
            return SendRequest(url, "POST", parameters);
        }
        private MobSocialResponse SendRequest(string url, string method, NameValueCollection parameters)
        {
            return SendRequestImpl<MobSocialResponse>(url, method, parameters);
        }

        private T SendRequestImpl<T>(string url, string method, NameValueCollection parameters)
        {
            parameters = parameters ?? new NameValueCollection();
            using (var webClient = new WebClient())
            {
                try
                {
#if DEBUG
                    ServicePointManager
                            .ServerCertificateValidationCallback +=
                        (sender, cert, chain, sslPolicyErrors) => true;
                    //disable ssl check for debug session
#endif
                    byte[] resBytes;
                    if (method == "GET")
                    {
                        var queryString = parameters.ToString();
                        resBytes = webClient.DownloadData($"{url}?{queryString}");
                    }
                    else
                    {
                        resBytes = webClient.UploadValues(url, method, parameters);
                    }
                    var result = System.Text.Encoding.UTF8.GetString(resBytes);
                    return JsonConvert.DeserializeObject<T>(result);
                }
                catch (Exception e)
                {

                    return default(T);
                }
            }
        }
        private NameValueCollection GetNewParameterCollection()
        {
            return new NameValueCollection()
            {
                {"clientId", _clientId},
                {"clientSecret", _clientSecret}
            };
        }
        #endregion
    }
}