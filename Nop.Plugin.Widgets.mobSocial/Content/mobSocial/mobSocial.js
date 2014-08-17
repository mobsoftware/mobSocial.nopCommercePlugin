var app = angular.module('mobSocialApp', []);


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



app.factory('dialogService', function () {
    return {
        open: function (elementId, minWidth, dialogButtons) {
            $('#' + elementId).dialog({
                minWidth: minWidth,
                buttons: dialogButtons
            });
            $('#' + elementId).dialog('open');
        }
    };
});


