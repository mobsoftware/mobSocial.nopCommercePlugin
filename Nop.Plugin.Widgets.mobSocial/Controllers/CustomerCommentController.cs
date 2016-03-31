using System.Web.Mvc;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Plugin.WebApi.MobSocial.Extensions;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Customers;
using Nop.Services.Media;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerCommentController : BasePublicController
    {
        private readonly IWorkContext _workContext;
        private readonly IPictureService _pictureService;

        public CustomerCommentController(IWorkContext workContext, IPictureService pictureService)
        {
            _workContext = workContext;
            _pictureService = pictureService;
        }

        public ActionResult CustomerComments()
        {
            var model = new CustomerCommentsModel() {
                CustomerName = _workContext.CurrentCustomer.GetFullName(),
                CanPost = _workContext.CurrentCustomer.IsRegistered(),
                CustomerProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = _workContext.CurrentCustomer.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                PreloadComments = true, //TODO: Make this property configurable using settings
                SinglePageCommentCount = 5
            };
            return View("mobSocial/CustomerComments/CustomerComments", model);
        }
    }
}
