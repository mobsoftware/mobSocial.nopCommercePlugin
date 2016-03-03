using System;
using System.Web.Mvc;
using Mob.Core;
using Mob.Core.Domain;
using Nop.Core;
using Nop.Core.Infrastructure;
using Nop.Plugin.WebApi.MobSocial.Domain;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerFollowController : BasePublicController
    {
        

        private readonly IWorkContext _workContext;
        private readonly ICustomerFollowService _customerFollowService;

        public CustomerFollowController(IWorkContext workContext, ICustomerFollowService customerFollowService)
        {
            _workContext = workContext;
            _customerFollowService = customerFollowService;
        }

        [HttpPost]
        public ActionResult Follow(string entityName, int id)
        {
            var response = false;
            var newStatus = 0;
            switch (entityName.ToLower())
            {
                case FollowableEntityNames.VideoBattle:
                    response = Follow<VideoBattle>(id);
                    break;
                case FollowableEntityNames.Customer:
                    response = Follow<CustomerProfile>(id);
                    break;
            }
            if (response)
                newStatus = 1;
            return Json(new {Success = response, NewStatus = newStatus});
        }

        [HttpPost]
        public ActionResult Unfollow(string entityName, int id)
        {
            var response = false;
            var newStatus = 0;
            switch (entityName.ToLower())
            {
                case FollowableEntityNames.VideoBattle:
                    response = Unfollow<VideoBattle>(id);
                    break;
                case FollowableEntityNames.Customer:
                    response = Unfollow<CustomerProfile>(id);
                    break;
            }
            if (response)
                newStatus = 0;
            return Json(new { Success = response, NewStatus = newStatus });
        }

        public ActionResult CustomerFollowButton()
        {
            return View("mobSocial/CustomerFollow/CustomerFollowButton");
        }

        #region helpers
        private bool Follow<T>(int id) where T : IFollowSupported
        {

            _customerFollowService.Insert<T>(_workContext.CurrentCustomer.Id, id);
            return true;

        }

        private bool Unfollow<T>(int id) where T : IFollowSupported
        {
            _customerFollowService.Delete<T>(_workContext.CurrentCustomer.Id, id);
            return true;
        }

        #endregion

        #region inner classes

        private static class FollowableEntityNames
        {
            public const string VideoBattle = "videobattle";
            public const string Customer = "customer";
        }

        #endregion
    }
}