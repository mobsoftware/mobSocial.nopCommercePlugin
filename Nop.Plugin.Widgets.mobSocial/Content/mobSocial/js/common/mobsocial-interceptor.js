app.service("MobSocialInterceptor", ["$rootScope",
    function($rootScope) {
        this.request = function(config) {
            return config;
        };
        this.responseError = function (response) {

            if (response.status === 401) { //unauthorized
                $rootScope.login();
                return;
            }
            if (response.status === 404) {
                //window.location.href = "/404";
                return;
            }
            
            return response;
        };
    }
]);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('MobSocialInterceptor');
}]);