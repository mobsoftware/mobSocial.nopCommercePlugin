window.mobSocial.directive("userProfileMini", ['$rootScope', function ($rootScope) {
    return {
        restrict: "E",
        templateUrl: window.Configuration.pluginPath +  "/app/pages/components/userProfileMini.html",
        replace: true,
        scope: {
            user: "=user"
        }
    }
}]);