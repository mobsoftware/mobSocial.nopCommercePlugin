app.directive("blockUi", ["$rootScope", "$compile", function($rootScope, $compile) {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, elem, attr) {
            elem.addClass("block-ui-container");
            const blockTemplate = '<div class="block-ui" ng-show="BlockUi"><div class="spinner"></div></div>';
            var newElem = angular.element(blockTemplate);
            elem.prepend(newElem);
            $compile(newElem)(scope);
        }
    }
}]);