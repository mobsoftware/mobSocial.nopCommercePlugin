"use strict";

app.service("FriendService", ["$http", function ($http) {
    this.SearchPeople = function(FriendSearchModel, Success, Error) {
        $http.post("/SearchPeople", FriendSearchModel)
            .success(Success)
            .error(Error);
    };

    this.AddFriend = function (FriendId, Success, Error) {
        $http.post("/Friends/AddFriend", {ToCustomerId: FriendId})
           .success(Success)
           .error(Error);
    };


    this.ConfirmFriend = function(FriendId, Success, Error) {
        $http.post("/Friends/ConfirmFriend", { FriendCustomerId: FriendId })
          .success(Success)
          .error(Error);
    };

    this.DeclineFriend = function(FriendId, Success, Error) {
        $http.post("/Friends/DeclineFriend", { Customer1Id: FriendId })
          .success(Success)
          .error(Error);
    };

    this.GetFriendRequests = function(Success, Error) {
        $http.post("/Friends/GetFriendRequests")
            .success(Success)
            .error(Error);
    };

}]);
