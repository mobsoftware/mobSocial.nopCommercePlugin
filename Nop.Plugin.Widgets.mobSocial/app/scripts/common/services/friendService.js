window.mobSocial.lazy.service("friendService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/friends";
    this.SearchPeople = function (FriendSearchModel, success, error) {

        webClientService.get(apiEndPoint + "/searchpeople", FriendSearchModel, success, error);
    };

    this.AddFriend = function (FriendId, success, error) {
        webClientService.post(apiEndPoint + "/addfriend/" + FriendId, null, success, error);
    };


    this.ConfirmFriend = function (FriendId, success, error) {
        webClientService.post(apiEndPoint + "/confirmfriend/" + FriendId, null, success, error);
    };

    this.DeclineFriend = function (FriendId, success, error) {
        webClientService.post(apiEndPoint + "/declinefriend/" + FriendId, null, success, error);
    };

    this.GetFriendRequests = function (success, error) {
        webClientService.get(apiEndPoint + "/getfriendrequests", null, success, error);
    };

    this.GetCustomerFriends = function (customerFriendsRequestModel, success, error) {
        webClientService.get(apiEndPoint + "/getcustomerfriends", customerFriendsRequestModel, success, error);
    };

    this.GetOnlineFriends = function (onlineFriendsRequestModel, success, error) {
        webClientService.get(apiEndPoint + "/online/get", onlineFriendsRequestModel, success, error);
    };
}]);
