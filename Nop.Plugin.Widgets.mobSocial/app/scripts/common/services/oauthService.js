"use strict";

window.mobSocial.service("oauthService", ["accessTokenEndPoint", "$injector", "localStorageService", function (accessTokenEndPoint, $injector, localStorageService) {
    var accessTokenKey = "mobsocial_access_token";
    this.getAccessToken = function (callback, forceFetch) {
        if (!forceFetch) {
            var token = localStorageService.get(accessTokenKey);
            if (token) {
                return callback(token);
            }
        }
        this.clearAccessToken();
        var $http = $injector.get("$http");
        return $http.post(accessTokenEndPoint).then(function (response) {
            if (response.data.success) {
                var token = response.data.access_token;
                if (token) {
                    localStorageService.set(accessTokenKey, token);
                    return callback(token);
                }
            }
            return null;
        });
    };

    this.clearAccessToken = function() {
        localStorageService.set(accessTokenKey, null);
    };
}]);
