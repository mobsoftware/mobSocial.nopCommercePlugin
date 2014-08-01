var app = angular.module('mobSocialApp', []);



/* Angular Directives */

app.directive('whenScrolled', function () {
    return function (scope, elm, attr) {
        var raw = elm[0];

        elm.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});


app.directive('openDialog', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {
            var dialogId = '#' + attr.openDialog;
            elem.bind('click', function (e) {
                $(dialogId).dialog().dialog('open');
            });
        }
    };
});


/* End Angular Directives */

