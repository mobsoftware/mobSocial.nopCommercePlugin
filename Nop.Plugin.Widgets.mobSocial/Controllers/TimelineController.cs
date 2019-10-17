using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Plugin.Widgets.MobSocial.Services;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class TimelineController : MobSocialWidgetBaseController
    {
        private readonly ITimelineWidgetLoaderService _timelineWidgetLoaderService;
        private readonly IWorkContext _workContext;
        public TimelineController(ITimelineWidgetLoaderService timelineWidgetLoaderService, 
            IWorkContext workContext)
        {
            _timelineWidgetLoaderService = timelineWidgetLoaderService;
            _workContext = workContext;
        }

        public IActionResult PostForm()
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
        public IActionResult Timeline(int customerId = 0)
        {
            if (!_workContext.CurrentCustomer.IsRegistered())
                return new UnauthorizedResult();

            return View("mobSocial/Timeline/Timeline", customerId);
        }

       
        #region Built-In Widgets

        public IActionResult TimelineWidget(int customerId = 0, int page = 1, int count = 15)
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

        public IActionResult VideoWidget()
        {
            return View("mobSocial/Timeline/Widget.Video");
        }
        public IActionResult VideoPostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.Video");
        }
        public IActionResult VideoPostPreview()
        {
            return View("mobSocial/Timeline/PostPreview.Video");
        }
        public IActionResult PictureWidget()
        {
            return View("mobSocial/Timeline/Widget.Picture");
        }
        public IActionResult PicturePostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.Picture");
        }
        public IActionResult PicturePostPreview()
        {
            return View("mobSocial/Timeline/PostPreview.Picture");
        }
        public IActionResult UrlWidget()
        {
            return View("mobSocial/Timeline/Widget.Url");
        }
        public IActionResult UrlPostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.Url");
        }
        public IActionResult UrlPostPreview()
        {
            return View("mobSocial/Timeline/PostPreview.Url");
        }
        public IActionResult VideoBattlePostDisplay()
        {
            return View("mobSocial/Timeline/PostDisplay.VideoBattle");
        }
        

        #endregion
    }
}
