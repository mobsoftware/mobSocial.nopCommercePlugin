app.directive("mediaButton", ["$rootScope", function ($rootScope) {
    return {
        restrict: "A",
        scope: {
            "target": "@target",
            "media": "=media"
        },
        link: function (scope, elem, attr) {
            elem.bind("click", function () {
                var modalScope = angular.element(scope.target).scope();
                if (!scope.media.FullyLoaded) {
                    modalScope.reloadMedia(scope.media.Id);
                } 
                jQuery(scope.target).show();
                $rootScope.bodyScroll(false);
            });
        }
    }
}]);