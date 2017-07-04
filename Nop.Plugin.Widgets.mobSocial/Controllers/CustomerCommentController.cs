using System.Web.Mvc;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.MobSocial.WebApi.Extensions;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Media;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerCommentController : MobSocialWidgetBaseController
    {
        private readonly IWorkContext _workContext;
        private readonly IPictureService _pictureService;
        private readonly MediaSettings _mediaSettings;

        public CustomerCommentController(IWorkContext workContext, IPictureService pictureService, MediaSettings mediaSettings)
        {
            _workContext = workContext;
            _pictureService = pictureService;
            _mediaSettings = mediaSettings;
        }

        public ActionResult CustomerComments()
        {
            var model = new CustomerCommentsModel() {
                CustomerName = _workContext.CurrentCustomer.GetFullName(),
                CanPost = _workContext.CurrentCustomer.IsRegistered(),
                CustomerProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = _workContext.CurrentCustomer.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                CustomerProfileImageUrl = _pictureService.GetPictureUrl(_workContext.CurrentCustomer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId), _mediaSettings.AvatarPictureSize, true),
                PreloadComments = true, //TODO: Make this property configurable using settings
                SinglePageCommentCount = 5
            };
            return View("mobSocial/CustomerComments/CustomerComments", model);
        }
    }
}
