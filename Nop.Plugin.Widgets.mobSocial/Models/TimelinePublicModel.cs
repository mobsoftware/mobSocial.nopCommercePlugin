using System.Collections.Generic;
using Microsoft.AspNetCore.Routing;
using Nop.Web.Framework.Models;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class TimelinePublicModel : BaseNopModel
    {
        public TimelinePublicModel()
        {
            TimelinePostViewModels = new List<TimelinePostViewModel>();
        }

        public int CustomerId { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }

        public IList<TimelinePostViewModel> TimelinePostViewModels { get; set; }

        public bool CanPost { get; set; }

        public class TimelinePostViewModel
        {
            public string PostTypeName { get; set; }

            public string ControllerName { get; set; }

            public string ActionName { get; set; }

            public RouteValueDictionary RouteValues { get; set; }
        }
    }
}
