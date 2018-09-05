using System.Collections.Generic;
using mobSocial.Data.Entity.Users;
using mobSocial.Data.Integration;

namespace Nop.MobSocial.WebApi.Integration
{
    public class CustomerIntegrationMap: IIntegrationMap<UserMap>
    {
        public string SourceTableName => "Customer";

        public Dictionary<string, string> SourceToDestinationColumnMapping => new Dictionary<string, string>
        {
            {"Id", "Id"},
            {"(SELECT TOP 1 [Value] FROM GenericAttribute WHERE [KeyGroup] = 'Customer' AND [Key] ='FirstName' AND EntityId = Customer.Id)", "FirstName"},
            {"(SELECT TOP 1 [Value] FROM GenericAttribute WHERE [KeyGroup] = 'Customer' AND [Key] ='LastName' AND EntityId = Customer.Id)", "LastName"},
            {"(SELECT [Value]+' ' FROM GenericAttribute WHERE [KeyGroup] = 'Customer' AND EntityId = Customer.Id AND ([Key] ='FirstName' OR [Key] ='LastName') FOR XML PATH(''))", "Name"},
            {"Email", "Email"},
            {"Username", "UserName"},
            {"CustomerGuid", "Guid"},
            {"Password", "Password"},
            {"PasswordSalt", "PasswordSalt"},
            {"PasswordFormatId", "PasswordFormat"},
            {"Active", "Active"},
            {"CreatedOnUtc", "DateCreated"},
            {"LastActivityDateUtc", "DateUpdated"},
            {"LastLoginDateUtc", "LastLoginDate"},
            {"IsSystemAccount", "IsSystemAccount"},
            {"AdminComment", "Remarks"},
            {"LastIpAddress", "LastLoginIpAddress"},
            {"AffiliateId", "ReferrerId"},
            {"Deleted", "Deleted"}
        };

        public string WhereString { get; set; } = "IsSystemAccount=0 AND Email IS NOT NULL AND Email != 'anonymous@anonymous.com'";
    }
}