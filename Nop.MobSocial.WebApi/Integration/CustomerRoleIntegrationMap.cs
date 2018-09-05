using System.Collections.Generic;
using mobSocial.Data.Entity.Users;
using mobSocial.Data.Integration;

namespace Nop.MobSocial.WebApi.Integration
{
    public class CustomerRoleIntegrationMap : IIntegrationMap<RoleMap>
    {
        public string SourceTableName => "CustomerRole";

        public Dictionary<string, string> SourceToDestinationColumnMapping => new Dictionary<string, string>()
        {
            {"Id", "Id"},
            {"Name", "RoleName"},
            {"IsSystemRole", "IsSystemRole" },
            {"SystemName", "SystemName" },
            {"Active", "IsActive" }
           
        };

        public string WhereString { get; set; }
    }
}