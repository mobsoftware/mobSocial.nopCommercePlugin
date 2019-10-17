using Microsoft.AspNetCore.Routing;
using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Feature.Timeline.Widgets
{
    public class UrlWidgetWidget : ITimelineWidget
    {
        public int DisplayOrder
        {
            get { return 0; }
        }

        public string PostTypeName
        {
            get { return "url"; }
        }

        public RouteDataModel GetWidgetRoute()
        {
            return new RouteDataModel() {
                ControllerName = "Timeline",
                ActionName = "UrlWidget",
                RouteValues = new RouteValueDictionary(new {
                    namespaces = "Nop.Plugin.Widgets.MobSocial.Controllers"
                })
            };
        }

        public bool IsActive()
        {
            return true;
        }


        public RouteDataModel GetPostDisplayRoute()
        {
            return new RouteDataModel() {
                ControllerName = "Timeline",
                ActionName = "UrlPostDisplay",
                RouteValues = new RouteValueDictionary(new {
                    namespaces = "Nop.Plugin.Widgets.MobSocial.Controllers"
                })
            };
        }


        public RouteDataModel GetPostPreviewRoute()
        {
            return new RouteDataModel() {
                ControllerName = "Timeline",
                ActionName = "UrlPostPreview",
                RouteValues = new RouteValueDictionary(new {
                    namespaces = "Nop.Plugin.Widgets.MobSocial.Controllers"
                })
            };
        }


        
    }
}
