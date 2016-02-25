using System.Web.Mvc;
using Nop.Plugin.WebApi.MobSocial.Models;
using Nop.Web.Controllers;


namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class FriendsController : BasePublicController
    {
        
        [Authorize]
        public ActionResult FriendButton()
        {
            return View("mobSocial/Friends/FriendButton");
        }

        
        [Authorize]
        public ActionResult FriendRequests()
        {
            return View("mobSocial/Friends/FriendRequests");
        }

        [Authorize]
        public ActionResult CustomerFriends(int customerId = 0, int howMany = 0, bool random = false)
        {
            return View("mobSocial/Friends/_CustomerFriends");

        }

        public ActionResult SearchPeople(string searchTerm = "", bool excludeLoggedInUser = true, int page = 1, int count = 15)
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