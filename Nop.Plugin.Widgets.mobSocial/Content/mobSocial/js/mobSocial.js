var app = angular.module('mobSocialApp', ['xeditable', 'ngAudio', 'angucomplete-alt', 'ngDateTimePicker', 'angularMoment', "SignalR"])
    .constant('rootUrl', './Plugins/Widgets.mobSocial/Content/mobSocial')
    .constant('globalApiEndPoint', '/api')
    .constant('signalREndPoint', '/signalr');
    
//attach some global functions to rootScope
app.run(["$rootScope", "globalApiEndPoint", "$http", "$sce", "routeProvider", "conversationHub", function ($rootScope, globalApiEndPoint, $http, $sce, routeProvider, conversationHub) {
    $rootScope.login = function (returnUrl) {
        returnUrl = returnUrl || window.location.href;
        //because the returnUrl may be absolute, it's better to explicitly reference the path from url for proper functioning
        var a = document.createElement("a");
        a.href = returnUrl;
        window.location.href = "/login?ReturnUrl=" + encodeURIComponent(a.pathname);
    };

    $rootScope.AutocompleteCustomer = function (userInputString, timeoutPromise) {
        var response = $http.get(globalApiEndPoint + '/autocomplete/users/get', { params: { search: userInputString, excludeLoggedInUser : true } }, { timeout: timeoutPromise });
        response.success(function (res) {
            if (res.length == 0 && validateEmail(userInputString)) {
                //because the response is zero, let's see if it's an email, if it is, we can add it for direct email invitation
                res.push({ DisplayName: userInputString, Id: userInputString, EmailInvite: true });
            }
        });
        return response;
    }

    $rootScope.bodyScroll = function(on) {
        if (!on) {
            angular.element("body").addClass("no-scroll");
            setTimeout(function() {
                    //quickfix - center the popup element on screen
                    var contentWidth = jQuery(".fixed-popup .content").outerWidth();
                    var winWidth = jQuery(document).outerWidth();
                    jQuery(".fixed-popup .content").css("left", (winWidth - contentWidth) / 2);
                },
                50);

        } else {
            angular.element("body").removeClass("no-scroll");
        }
    }

    $rootScope.videogularConfig = {
        theme: "/Plugins/Widgets.mobSocial/Content/Libraries/videogular/theme/videogular.css",
        preload: "metadata"
    };

    $rootScope.updatedVideoSource = function ($api, url, mimeType) {
        var source = [
            {
                src: $sce.trustAsResourceUrl(url),
                type: mimeType
            }
        ];
        $api.changeSource(source);
        $api.sources = source;
    }

    $rootScope.routeUrl = function(routeName, params, redirect) {
        var url = routeProvider.routeUrl(routeName, params);
        if (redirect)
            window.location.href = url;

        return url;
    }

    $rootScope.areDatesSame = function (date1, date2, format) {
        var d1 = new Date(date1);
        var d2 = new Date(date2);
        if (d1 == "Invalid Date" || d2 == "Invalid Date")
            return false;
        return d1.toDateString() == d2.toDateString();
    }
}]);