using System.Collections.Generic;

namespace Nop.Plugin.Widgets.MobSocial.Models.TeamPage
{
    public class TeamPageGroupModel
    {

        public TeamPageGroupModel()
        {
            Members = new List<TeamPageGroupMemberModel>();
        }

        public string Name { get; set; }
        public string Description { get; set; }

        public List<TeamPageGroupMemberModel> Members { get; set; }

    }
}