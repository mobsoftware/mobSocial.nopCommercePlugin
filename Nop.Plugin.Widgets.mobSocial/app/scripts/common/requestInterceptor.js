window.mobSocial.service("MobSocialInterceptor", ["$rootScope", "oauthService", "$injector", function ($rootScope, oauthService, $injector) {
    this.request = function (config) {
        if ($rootScope.clearMessages)
            $rootScope.clearMessages();
        return config;
    };
    this.response = function (response) {
        $rootScope.checkTokenExpiration();
        if (response.data) {
            if (response.data.Messages) {
                $rootScope._responseMessages = response.data.Messages;
            }
            if (response.data.ErrorMessages) {
                $rootScope._errorMessages = response.data.ErrorMessages;
            }
        }
        return response;
    };

    this.responseError = function (response) {
        $rootScope.checkTokenExpiration();
        if (response.status === 400) { //bad request
            $rootScope._errorMessages = {
                "_global": [response.data.message || "Oops, something went wrong"]
            };
        }
        else if (response.status === 401) { //unauthorized
            $rootScope.login();
        }
        else if (response.status === 403) {
            ////get the token again and call the previous request again
            oauthService.getAccessToken(function (token) {

                var $http = $injector.get("$http");
                if (token.startsWith("app_"))
                    token = token.substr("app_".length);
                response.config.headers["Authorization"] = 'Bearer ' + token;
                $http(response.config).then(function (resp) {
                    if (response.config.success)
                        response.config.success(resp.data);
                });

            },
                true);
        }
        else if (response.status === 404) {
            //not found
            // window.location.href = "/404";
        }
        else if (response.status === 412) {
            //app token expired
            oauthService.clearAccessToken();
            window.location.reload();
        }

        return response;
    };
}
]);
window.mobSocial.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('MobSocialInterceptor');
}]);