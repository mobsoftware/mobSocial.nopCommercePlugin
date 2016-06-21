var app = angular.module('mobSocialApp', ['xeditable', 'ngAudio', 'angucomplete-alt', 'ngDateTimePicker', 'angularMoment'])
    .constant('rootUrl', './Plugins/Widgets.mobSocial/Content/mobSocial')
    .constant('globalApiEndPoint', '/api');
    
//attach some global functions to rootScope
app.run(["$rootScope", "globalApiEndPoint", "$http", function ($rootScope, globalApiEndPoint, $http) {
    $rootScope.login = function (returnUrl) {
        //because the returnUrl may be absolute, it's better to explicitly reference the path from url for proper functioning
        var a = document.createElement("a");
        a.href = returnUrl;
        window.location.href = "/login?ReturnUrl=" + encodeURIComponent(a.pathname);
    };

    $rootScope.AutocompleteCustomer = function (userInputString, timeoutPromise) {
        var response = $http.get(globalApiEndPoint + '/mobsocial/searchtermautocomplete', { params: { term: userInputString } }, { timeout: timeoutPromise });
        response.success(function (res) {
            if (res.length == 0 && validateEmail(userInputString)) {
                //because the response is zero, let's see if it's an email, if it is, we can add it for direct email invitation
                res.push({ DisplayName: userInputString, Id: userInputString, EmailInvite: true });
            }
        });
        return response;
    }
}]);