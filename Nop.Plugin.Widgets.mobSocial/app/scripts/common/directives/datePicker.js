window.mobSocial.directive("datePicker", ["$rootScope", "$compile", function ($rootScope, $compile) {
    return {
        restrict: "A",
        scope: {
            "ngModel": "="
        },
        link: function (scope, elem, attr) {
            elem.datepicker({
                autoclose: true
            });
            if (scope.ngModel)
            //set default date
                elem.datepicker("setDate", new Date(scope.ngModel));
        }
    }
}]);