using Microsoft.AspNetCore.Mvc;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Media;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerCommentController : MobSocialWidgetBaseController
    {
        private readonly IWorkContext _workContext;
        private readonly IPictureService _pictureService;
        private readonly MediaSettings _mediaSettings;
        private readonly IGenericAttributeService _genericAttributeService;
        private readonly ICustomerService _customerService;
        public CustomerCommentController(IWorkContext workContext, IPictureService pictureService, MediaSettings mediaSettings, IGenericAttributeService genericAttributeService, ICustomerService customerService)
        {
            _workContext = workContext;
            _pictureService = pictureService;
            _mediaSettings = mediaSettings;
            _genericAttributeService = genericAttributeService;
            _customerService = customerService;
        }

        public IActionResult CustomerComments()
        {
            var model = new CustomerCommentsModel()
            {
                CustomerName = _customerService.GetCustomerFullName(_workContext.CurrentCustomer),
                CanPost = _workContext.CurrentCustomer.IsRegistered(),
                CustomerProfileUrl = Url.RouteUrl("CustomerProfileUrl",
                    new
                    {
                        Id = _workContext.CurrentCustomer.Id
                    }),
                CustomerProfileImageUrl =
                    _pictureService.GetPictureUrl(
                        _genericAttributeService.GetAttribute<int>(_workContext.CurrentCustomer, NopCustomerDefaults.AvatarPictureIdAttribute),
                        _mediaSettings.AvatarPictureSize, true),
                PreloadComments = true, //TODO: Make this property configurable using settings
                SinglePageCommentCount = 5
            };
            return View("mobSocial/CustomerComments/CustomerComments", model);
        }
    }
}
