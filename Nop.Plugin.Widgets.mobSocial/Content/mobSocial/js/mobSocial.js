var app = angular.module('mobSocialApp', ['xeditable', 'ngAudio', 'angucomplete-alt', 'ngDateTimePicker', 'angularMoment'])
    .constant('rootUrl', './Plugins/Widgets.mobSocial/Content/mobSocial')
    .constant('globalApiEndPoint', '/api');
    
//attach some global functions to rootScope
app.run(["$rootScope", "globalApiEndPoint", "$http", "$sce", function ($rootScope, globalApiEndPoint, $http, $sce) {
    $rootScope.login = function (returnUrl) {
        returnUrl = returnUrl || window.location.href;
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

}]);