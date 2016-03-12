using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core.Infrastructure;
using Nop.Plugin.Widgets.MobSocial.Feature.Timeline;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class TimelineWidgetLoaderService : ITimelineWidgetLoaderService
    {
        private readonly ITypeFinder _typeFinder;

        public TimelineWidgetLoaderService(ITypeFinder typeFinder)
        {
            _typeFinder = typeFinder;
        }

        public IList<ITimelineWidget> GetTimelineWidgetsAcrossApp()
        {
            var types = _typeFinder.FindClassesOfType<ITimelineWidget>();
            return types.Select(t => (ITimelineWidget) Activator.CreateInstance(t)).ToList();
        }
    }
}
