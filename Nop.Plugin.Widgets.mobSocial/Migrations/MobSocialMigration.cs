using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Migrations;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Migrations
{
    public class MobSocialMigration : MobMigration
    {
        public override void Up()
        {
            AddColumn(typeof(ArtistPage).Name, "TempCol", x => x.String());
        }
    }
}
