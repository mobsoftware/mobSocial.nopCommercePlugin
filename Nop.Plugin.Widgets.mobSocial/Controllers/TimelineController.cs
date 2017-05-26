using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class TimelineController : BasePublicController
    {
        private readonly ITimelineWidgetLoaderService _timelineWidgetLoaderService;
        private readonly IWorkContext _workContext;
        public TimelineController(ITimelineWidgetLoaderService timelineWidgetLoaderService, 
            IWorkContext workContext)
        {
            _timelineWidgetLoaderService = timelineWidgetLoaderService;
            _workContext = workContext;
        }

        [ChildActionOnly]
        public ActionResult PostForm()
        {
            var timelineWidgets = _timelineWidgetLoaderService.GetTimelineWidgetsAcrossApp();
            if (!timelineWidgets.Any())
                return null;
            var model = new List<TimelineWidgetModel>();
            foreach (var widget in timelineWidgets)
            {
                //widget route
                var widgetRouteData = widget.GetWidgetRoute();
                var previewRouteData = widget.GetPostPreviewRoute();

                model.Add(new TimelineWidgetModel() {
                    PostPreviewData = previewRouteData,
                    WidgetRouteData = widgetRouteData,
                    PostTypeName = widget.PostTypeName
                });
            }
            return View("mobSocial/Timeline/PostForm", model);
        }
        public ActionResult Timeline(int customerId = 0)
        {
            if (!_workContext.CurrentCustomer.IsRegistered())
                return new HttpUnauthorizedResult();

            return View("mobSocial/Timeline/Timeline", customerId);
        }

       
        #region Built-In Widgets

        [ChildActionOnly]
        public ActionResult TimelineWidget(int customerId = 0, int page = 1, int count = 15)
        {
            var model = new TimelinePublicModel() {
                CustomerId = customerId,
                Count = count,
                Page = page,
                CanPost = _workContext.CurrentCustomer.Id == customerId || customerId == 0
            };
            var timelineWidgets = _timelineWidgetLoaderService.GetTimelineWidgetsAcrossApp();
            if (timelineWidgets.Any())
            {
                foreach (var widget in timelineWidgets)
                {
                    if (!widget.IsActive())
                        continue;

                    //display route
                    var route = widget.GetPostDisplayRoute();
                    model.TimelinePostViewModels.Add(new TimelinePublicModel.TimelinePostViewModel() {
                        ActionName = route.ActionName,
                        ControllerName = route.ControllerName,
                        RouteValues = route.RouteValues,
                        PostTypeName = widget.PostTypeName
                    });
                }
            }
            return View("mobSocial/Timeline/TimelineWidget", model);
        }

        public ActionResult VideoWidget()
        {
            return View("mobSocial/Timeline/Widget.Video");
        }
        public ActionResult VideoPostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.Video");
        }
        public ActionResult VideoPostPreview()
        {
            return View("mobSocial/Timeline/PostPreview.Video");
        }
        public ActionResult PictureWidget()
        {
            return View("mobSocial/Timeline/Widget.Picture");
        }
        public ActionResult PicturePostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.Picture");
        }
        public ActionResult PicturePostPreview()
        {
            return View("mobSocial/Timeline/PostPreview.Picture");
        }
        public ActionResult UrlWidget()
        {
            return View("mobSocial/Timeline/Widget.Url");
        }
        public ActionResult UrlPostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.Url");
        }
        public ActionResult UrlPostPreview()
        {
            return View("mobSocial/Timeline/PostPreview.Url");
        }
        public ActionResult VideoBattlePostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.VideoBattle");
        }
        

        #endregion
    }
}
