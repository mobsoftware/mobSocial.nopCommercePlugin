using Microsoft.AspNetCore.Routing;
using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Feature.Timeline.Widgets
{
    public class VideoBattlePublishWidget : ITimelineWidget
    {
        public int DisplayOrder
        {
            get { return 0; }
        }

        public string PostTypeName
        {
            get { return "videobattle-publish"; }
        }

        public RouteDataModel GetWidgetRoute()
        {
            return null;
        }

        public bool IsActive()
        {
            return true;
        }


        public RouteDataModel GetPostDisplayRoute()
        {
            return new RouteDataModel() {
                ControllerName = "Timeline",
                ActionName = "VideoBattlePostDisplay",
                RouteValues = new RouteValueDictionary(new {
                    namespaces = "Nop.Plugin.Widgets.MobSocial.Controllers"
                })
            };
        }


        public RouteDataModel GetPostPreviewRoute()
        {
            return null;
        }


        
    }
}
