using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class TimelineWidgetModel : BaseNopModel
    {
        public RouteDataModel WidgetRouteData { get; set; }

        public RouteDataModel PostPreviewData { get; set; }

        public string PostTypeName { get; set; }
    }
}
