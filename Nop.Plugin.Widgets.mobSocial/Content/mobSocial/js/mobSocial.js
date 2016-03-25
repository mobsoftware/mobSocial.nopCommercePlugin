var app = angular.module('mobSocialApp', ['xeditable', 'ngAudio', 'angucomplete-alt', 'ngDateTimePicker', 'angularMoment'])
    .constant('rootUrl', './Plugins/Widgets.mobSocial/Content/mobSocial')
    .constant('globalApiEndPoint', '/api');
    
//attach some global functions to rootScope
app.run(function ($rootScope) {
    $rootScope.login = function (returnUrl) {
        //because the returnUrl may be absolute, it's better to explicitly reference the path from url for proper functioning
        var a = document.createElement("a");
        a.href = returnUrl;
        window.location.href = "/login?ReturnUrl=" + encodeURIComponent(a.pathname);
    };
});