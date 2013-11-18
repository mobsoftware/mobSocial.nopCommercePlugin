using System.Collections.Generic;
using Nop.Web.Framework.Mvc;
using Nop.Web.Models.Customer;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class ProfileInformationModel : BaseNopModel
    {
        public ProfileInformationModel()
        {
            
        }

        public CustomerNavigationModel NavigationModel { get; set; }

        public string ProfileUrl { get; set; }


    }

}