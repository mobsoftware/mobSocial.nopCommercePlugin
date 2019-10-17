using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nop.Plugin.Widgets.MobSocial.Models;


namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class FriendsController : MobSocialWidgetBaseController
    {
        
        //[Authorize]
        public IActionResult FriendButton()
        {
            return View("mobSocial/Friends/FriendButton");
        }

        
        [Authorize]
        public IActionResult FriendRequests()
        {
            return View("mobSocial/Friends/FriendRequests");
        }

        //[Authorize]
        public IActionResult CustomerFriends(int customerId, int howMany = 0, bool random = false)
        {
            var model = new CustomerFriendsRequestModel()
            {
                CustomerId = customerId,
                HowMany = howMany,
                Random = random,
                Page = 1
            };
            return View("mobSocial/Friends/_CustomerFriends", model);

        }

        public IActionResult SearchPeople(string searchTerm = "", bool excludeLoggedInUser = true, int page = 1, int count = 15)
        {
            var model = new FriendSearchModel() {
                SearchTerm = searchTerm,
                ExcludeLoggedInUser = excludeLoggedInUser,
                Count = count,
                Page = page
            };
            return View("mobSocial/Friends/SearchPeople", model);
        }
    }
}