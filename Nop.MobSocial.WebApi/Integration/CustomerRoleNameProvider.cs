using mobSocial.Data.Entity.Users;

namespace Nop.MobSocial.WebApi.Integration
{
    public class CustomerRoleNameProvider : IRoleNameProvider
    {
        public string Administrator => "Administrators";
        public string Visitor => "Guests";
        public string Registered => "Registered";
    }
}