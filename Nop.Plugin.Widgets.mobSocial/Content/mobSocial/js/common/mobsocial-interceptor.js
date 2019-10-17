app.service("MobSocialInterceptor", ["$rootScope", "$injector", "$timeout",
    function($rootScope, $injector, $timeout) {
        this.request = function(config) {
            return config;
        };
        this.responseError = function (response) {
            if (response.status === 401) { //unauthorized
                
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