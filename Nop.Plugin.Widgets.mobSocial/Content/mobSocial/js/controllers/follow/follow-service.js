"use strict";

app.service("FollowService", ["$http", function ($http) {
    this.Follow = function(type, id, Success, Error) {
        $http.post("/Follow/" + type, {id: id})
            .success(Success)
            .error(Error);
    };

    this.Unfollow = function (type, id, Success, Error) {
        $http.post("/Unfollow/" + type, { id: id })
            .success(Success)
            .error(Error);
    };

}]);
