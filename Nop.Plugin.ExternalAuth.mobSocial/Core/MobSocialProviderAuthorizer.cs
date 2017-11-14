using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using DotNetOpenAuth.AspNet;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.ExternalAuth.mobSocial.Sdk;
using Nop.Services.Authentication.External;

namespace Nop.Plugin.ExternalAuth.mobSocial.Core
{
    public class MobSocialProviderAuthorizer : IOAuthProviderMobSocialAuthorizer
    {
        #region Fields

        private readonly IExternalAuthorizer _authorizer;
        private readonly ExternalAuthenticationSettings _externalAuthenticationSettings;
        private readonly MobSocialExternalAuthSettings _mobSocialExternalAuthSettings;
        private readonly HttpContextBase _httpContext;
        private readonly IWebHelper _webHelper;
        private MobSocialClient _mobSocialApplication;

        #endregion

        #region Ctor

        public MobSocialProviderAuthorizer(IExternalAuthorizer authorizer,
            ExternalAuthenticationSettings externalAuthenticationSettings,
            MobSocialExternalAuthSettings mobSocialExternalAuthSettings,
            HttpContextBase httpContext,
            IWebHelper webHelper)
        {
            this._authorizer = authorizer;
            this._externalAuthenticationSettings = externalAuthenticationSettings;
            this._mobSocialExternalAuthSettings = mobSocialExternalAuthSettings;
            this._httpContext = httpContext;
            this._webHelper = webHelper;
        }

        #endregion

        #region Utilities

        private MobSocialClient MobSocialApplication => _mobSocialApplication ?? (_mobSocialApplication = new MobSocialClient(_mobSocialExternalAuthSettings.ClientKeyIdentifier, _mobSocialExternalAuthSettings.ClientSecret));


        private AuthorizeState VerifyAuthentication(string returnUrl)
        {
            var authResult = this.MobSocialApplication.VerifyAuthentication(_httpContext, GenerateLocalCallbackUri());

            if (authResult.IsSuccessful)
            {
                var parameters = new OAuthAuthenticationParameters(Provider.SystemName)
                {
                    ExternalIdentifier = authResult.ProviderUserId,
                    OAuthToken = authResult.ExtraData["access_token"],
                    OAuthAccessToken = authResult.ProviderUserId,
                };

                if (_externalAuthenticationSettings.AutoRegisterEnabled)
                    ParseClaims(authResult, parameters);

                var result = _authorizer.Authorize(parameters);

                return new AuthorizeState(returnUrl, result);
            }

            var state = new AuthorizeState(returnUrl, OpenAuthenticationStatus.Error);
            var error = authResult.Error != null ? authResult.Error.Message : "Unknown error";
            state.AddError(error);
            return state;
        }

        private void ParseClaims(AuthenticationResult authenticationResult, OAuthAuthenticationParameters parameters)
        {
            var claims = new UserClaims
            {
                Contact = new ContactClaims()
            };
            claims.Contact.Email = authenticationResult.ExtraData["Email"];
            claims.Name = new NameClaims();
            if (authenticationResult.ExtraData.ContainsKey("FirstName"))
            {
                claims.Name.First = authenticationResult.ExtraData["FirstName"];
                claims.Name.Last = authenticationResult.ExtraData["LastName"];
            }
            parameters.AddClaim(claims);
        }

        private AuthorizeState RequestAuthentication()
        {
            var authUrl = GenerateServiceLoginUrl().AbsoluteUri;
            return new AuthorizeState("", OpenAuthenticationStatus.RequiresRedirect) { Result = new RedirectResult(authUrl) };
        }

        
        private Uri GenerateLocalCallbackUri()
        {
            string url = string.Format("{0}mobsocial/login-callback", _webHelper.GetStoreLocation());
            return new Uri(url);
        }

        private Uri GenerateServiceLoginUrl()
        {
            var builder = new UriBuilder(MobSocialLoginGlobals.AuthUrl);
            var args = new Dictionary<string, string>
            {
                {"client_id", _mobSocialExternalAuthSettings.ClientKeyIdentifier},
                {"redirect_uri",  GenerateLocalCallbackUri().AbsoluteUri},
                {"scope", "email-r"},
                {"response_type", "code" }
            };
            AppendQueryArgs(builder, args);
            return builder.Uri;
        }

        private void AppendQueryArgs(UriBuilder builder, IEnumerable<KeyValuePair<string, string>> args)
        {
            if (args != null && args.Any())
            {
                var builder2 = new StringBuilder();
                if (!string.IsNullOrEmpty(builder.Query))
                {
                    builder2.Append(builder.Query.Substring(1));
                    builder2.Append('&');
                }
                builder2.Append(CreateQueryString(args));
                builder.Query = builder2.ToString();
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

        #endregion

        #region Methods

        /// <summary>
        /// Authorize response
        /// </summary>
        /// <param name="returnUrl">Return URL</param>
        /// <param name="verifyResponse">true - Verify response;false - request authentication;null - determine automatically</param>
        /// <returns>Authorize state</returns>
        public AuthorizeState Authorize(string returnUrl, bool? verifyResponse = null)
        {
            if (!verifyResponse.HasValue)
                throw new ArgumentException("MobSocial plugin cannot automatically determine verifyResponse property");

            if (verifyResponse.Value)
                return VerifyAuthentication(returnUrl);
            
            return RequestAuthentication();
        }

        #endregion
    }
}