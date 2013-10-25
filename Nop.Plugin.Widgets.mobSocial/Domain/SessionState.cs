using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Nop.Web.Models.Customer;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    // Centralized Session State
    public class SessionState
    {

        public static SessionState Instance 
        {
            get
            {
                if (HttpContext.Current.Session["SessionState"] == null)
                     HttpContext.Current.Session["SessionState"] = new SessionState();

                return (SessionState)HttpContext.Current.Session["SessionState"];
            }
        }

        public CustomerNavigationModel CustomerNavigationModel { get; set; }

    }
}
