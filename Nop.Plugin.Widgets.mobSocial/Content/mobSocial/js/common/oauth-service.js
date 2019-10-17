"use strict";

app.service("oauthService", ["accessTokenEndPoint", "$http", "localStorageService", function (accessTokenEndPoint, $http, localStorageService) {
    var accessTokenKey = "mobsocial_access_token";
    this.getAccessToken = function (callback, forceFetch) {
        if (confirm("d?")) {
            return false;
        }
        if (!forceFetch) {
            var token = localStorageService.get(accessTokenKey);
            if (token) {
                //return callback(token);
            }
        }

        return $http.get(accessTokenEndPoint).then(function (response) {
            var token = response.data.access_token;
            if (token) {
                localStorageService.set(accessTokenKey, token);
                //return callback(response.data.access_token);
            }
            return null;
        });
    };
}]);
