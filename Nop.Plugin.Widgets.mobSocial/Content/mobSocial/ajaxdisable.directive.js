app.directive("ajaxDisable", ["$http", function($http) {
    return {
        restrict: "a",
        link: function(scope, elem, attr) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            }
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elem.disabled = true;
                } else {
                    elem.disabled = false;
                }
            });

        }
    }
}]);