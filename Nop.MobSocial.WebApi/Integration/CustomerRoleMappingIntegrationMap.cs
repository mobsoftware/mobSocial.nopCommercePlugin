using System.Collections.Generic;
using mobSocial.Data.Entity.Users;
using mobSocial.Data.Integration;

namespace Nop.MobSocial.WebApi.Integration
{
    public class CustomerRoleMappingIntegrationMap : IIntegrationMap<UserRoleMap>
    {
        public string SourceTableName => "Customer_CustomerRole_Mapping";

        public Dictionary<string, string> SourceToDestinationColumnMapping => new Dictionary<string, string>()
        {
            {"CAST(row_number() OVER (ORDER BY Customer_Id, CustomerRole_Id) AS INT)", "Id" },
            {"Customer_Id", "UserId"},
            {"CustomerRole_Id", "RoleId"}
        };
        public string WhereString  => "CustomerRole_Id != 4"; //exclude guests for performance
    }
}
