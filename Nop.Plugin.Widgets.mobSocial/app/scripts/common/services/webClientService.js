window.mobSocial.service("webClientService", ["$http", "$rootScope", "oauthService", function ($http, $rootScope, oauthService) {

    this._connect = function(method, url, params, success, error) {
        var config = {
            method: method,
            url: url,
            headers: { 'X-Requested-With': 'XMLHttpRequest'/*, 'Content-Type': 'application/x-www-form-urlencoded'*/ }
            //transformRequest: function (obj) {
            //    var str = [];
            //    for (var p in obj)
            //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //    return str.join("&");
            //}
        };
        //to make any calls access token is required
        if (method === "GET")
            config["params"] = params;
        else {
            config["data"] = params;
            config["dataType"] = "json";
        }
        config.success = success;
        config.error = error;
        oauthService.getAccessToken(function(token) {
            //set bearer token
            //$http.defaults.headers.common.Authorization = 'Bearer ' + token;
            if (token.startsWith("app_"))
                token = token.substr("app_".length);

            config.headers["Authorization"] = 'Bearer ' + token;
            $rootScope.BlockUi = true;
            $http(config).then(function(response) {
                    $rootScope.BlockUi = false;
                    if (success)
                        success(response.data);
                },
                function(response) {
                    $rootScope.BlockUi = false;
                    if (error)
                        error(response.data);
                });
        });

    };

    this.get = function (url, params, success, error) {
        this._connect("GET", url, params, success, error);
    };

    this.post = function (url, params, success, error) {
        this._connect("POST", url, params, success, error);
    };

    this.put = function (url, params, success, error) {
        this._connect("PUT", url, params, success, error);
    };

    this.patch = function (url, params, success, error) {
        this._connect("PATCH", url, params, success, error);
    };

    this.delete = function (url, params, success, error) {
        this._connect("DELETE", url, params, success, error);
    };
}]);