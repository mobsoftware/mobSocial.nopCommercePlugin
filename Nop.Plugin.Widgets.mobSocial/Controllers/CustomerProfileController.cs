using System.Web.Mvc;
using Nop.Web.Controllers;
using Nop.Web.Models.Profile;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class CustomerProfileController : BasePublicController
    {
       

        [ChildActionOnly]
        public ActionResult CustomerProfile(ProfileIndexModel model)
        {
           /* var customerId = model.CustomerProfileId;
            //increment view count
            _customerProfileViewService.IncrementViewCount(customerId);

            //get customer object
            var customer = _customerService.GetCustomerById(customerId);
            if (customer == null)
            {
                return null;
            }

            var customerSeName = SeoExtensions.GetSeName(customer, _workContext.WorkingLanguage.Id, true, false);
            var profilemodel = new CustomerProfilePublicModel() {
                CustomerId = customerId,
                ViewCount = _customerProfileViewService.GetViewCount(customerId),
                FriendCount = _customerProfileService.GetFriendCount(customerId),
                CustomerName = customer.GetFullName(),
                SeName = customerSeName,
                ProfileUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = customerSeName }),
                ProfileImageUrl = _pictureService.GetPictureUrl(customer.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId), _mediaSettings.AvatarPictureSize, true),
                CoverImageUrl = _pictureService.GetPictureUrl(customer.GetAttribute<int>(AdditionalCustomerAttributeNames.CoverImageId), showDefaultPicture: false),
                ProfileIndexModel = model
            };

            if (_workContext.CurrentCustomer.Id == customerId)
            {
                profilemodel.FriendStatus = FriendStatus.Self;
                profilemodel.IsEditable = true;
            }
            else
            {
                //depending on who is viewing the profile, let's set the friend status and other relevent values
                var customerFriend = _friendService.GetCustomerFriendship(_workContext.CurrentCustomer.Id, customer.Id);
                if (customerFriend == null)
                    profilemodel.FriendStatus = FriendStatus.None;
                else if (customerFriend.Confirmed)
                    profilemodel.FriendStatus = FriendStatus.Friends;
                else if (!customerFriend.Confirmed && customerFriend.FromCustomerId == _workContext.CurrentCustomer.Id)
                    profilemodel.FriendStatus = FriendStatus.FriendRequestSent;
                else
                    profilemodel.FriendStatus = FriendStatus.NeedsConfirmed;
            }

           //and the follower counts & logged in user following status
            var followers = _customerFollowService.GetFollowers<CustomerProfile>(customerId);
            profilemodel.FollowingStatus = followers.Any(x => x.CustomerId == _workContext.CurrentCustomer.Id) ? 1 : 0;
            profilemodel.FollowerCount = followers.Count;
            return View("mobSocial/CustomerProfile/Profile", profilemodel);*/
            return null;
        }


        [ChildActionOnly]
        public ActionResult PublicInfo(string widgetZone)
        {
           return View("mobSocial/AboutMe/PublicInfo");
        }

    }
}
