using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Feature.Timeline;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ITimelineWidgetLoaderService
    {
        IList<ITimelineWidget> GetTimelineWidgetsAcrossApp();
    }
}