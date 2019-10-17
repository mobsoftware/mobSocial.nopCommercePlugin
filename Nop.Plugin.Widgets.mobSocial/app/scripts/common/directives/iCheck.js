window.mobSocial.directive('icheck', function () {
    return {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            element.iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' // optional
            });

            element.on('ifChanged', function (event) {
                scope.$apply(function () {
                    scope.ngModel = true;
                });
            });

            element.on('ifUnchecked', function (event) {
                scope.$apply(function () {
                    scope.ngModel = false;
                });
            });

            scope.$watch("ngModel",
                function(newValue) {
                    if (scope.ngModel)
                        element.parent().addClass("checked");
                    else
                        element.parent().removeClass("checked");
                });
            
        }
    };
});