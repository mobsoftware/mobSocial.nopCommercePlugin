"use strict";

app.service("FriendService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/friends";
    this.SearchPeople = function (FriendSearchModel, success, error) {

        WebClientService.get(apiEndPoint + "/searchpeople", FriendSearchModel, success, error);
    };

    this.AddFriend = function (FriendId, success, error) {
        WebClientService.post(apiEndPoint + "/addfriend/" + FriendId, null, success, error);
    };


    this.ConfirmFriend = function(FriendId, success, error) {
        WebClientService.post(apiEndPoint + "/confirmfriend/" + FriendId, null, success, error);
    };

    this.DeclineFriend = function(FriendId, success, error) {
        WebClientService.post(apiEndPoint + "/declinefriend/" + FriendId, null, success, error);
    };

    this.GetFriendRequests = function(success, error) {
        WebClientService.get(apiEndPoint + "/getfriendrequests", null, success, error);
    };

    this.GetCustomerFriends = function (customerFriendsRequestModel, success, error) {
        WebClientService.get(apiEndPoint + "/getcustomerfriends", customerFriendsRequestModel, success, error);
    };

}]);
