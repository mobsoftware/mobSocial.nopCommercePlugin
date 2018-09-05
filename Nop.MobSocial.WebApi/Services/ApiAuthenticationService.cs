using System;
using System.Linq;
using System.Web;
using mobSocial.Data.Entity.Settings;
using mobSocial.Data.Entity.Users;
using mobSocial.Services.Authentication;
using mobSocial.Services.Security;
using mobSocial.Services.Users;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Infrastructure;
using Nop.Services.Common;

namespace Nop.MobSocial.WebApi.Services
{
    /// <summary>
    /// Overrides the default authentication service of mobSocial to integrate with nopCommerce
    /// </summary>
    public class ApiAuthenticationService : AuthenticationService
    {
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;
        public ApiAuthenticationService(IUserService userService, IUserRegistrationService userRegistrationService, SecuritySettings securitySettings, ICryptographyService cryptographyService, HttpContextBase contextBase, IRoleService roleService) : base(userService, userRegistrationService, securitySettings, cryptographyService, contextBase)
        {
            _userService = userService;
            _roleService = roleService;
        }

        private User _user = null;
        public override User GetCurrentUser()
        {
            //resolve nopCommerce customer service
            var workContext = EngineContext.Current.Resolve<IWorkContext>();

            if (workContext.CurrentCustomer.IsGuest())
            {
                throw new Exception("Nullable");
                return null;
            }
            if (_user == null)
            {
                _user = _userService.GetCompleteUser(workContext.CurrentCustomer.Id);
            }
            return _user;
        }
    }
}