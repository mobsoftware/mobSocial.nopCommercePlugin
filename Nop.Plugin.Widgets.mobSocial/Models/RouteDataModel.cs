using Microsoft.AspNetCore.Routing;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class RouteDataModel
    {
        public string ControllerName { get; set; }

        public string ActionName { get; set; }

        public RouteValueDictionary RouteValues { get; set; }
    }
}
