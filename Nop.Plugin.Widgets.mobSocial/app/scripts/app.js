window.mobSocial = angular.module("mobSocialApp", ['ui.router', 'LocalStorageModule', 'angularMoment', "oc.lazyLoad", "ngSanitize", "mentio", "SignalR", 'ui.slimscroll', "angucomplete-alt"])
    .constant('rootUrl', './Plugins/Widgets.mobSocial/Content/mobSocial')
    .constant('globalApiEndPoint', window.Configuration.globalApiEndPoint)
    .constant('accessTokenEndPoint', '/social/access-token')
    .constant('signalREndPoint', 'https://mobsocial.co/signalr')
    .constant('mobSocialClientId', '714c2b79f006444fa089466cee4433c6')
	.constant('loggedInUserKey', 'loggedin')
    .constant('userInfoKey', 'userinfo')
    .factory('$global', [
        'globalApiEndPoint', function (globalApiEndPoint) {
            return {
                getApiUrl: function (url) {
                    return globalApiEndPoint + url;
                }
            }
        }
    ]);



//attach some global functions to rootScope
window.mobSocial.run([
    "$rootScope", "$sce", "$state", "$window", "$q", "$interval", "autoCompleteService", "authProvider",
    "conversationHub", "$http", "globalApiEndPoint", "oauthService",
    function ($rootScope, $sce, $state, $window, $q, $interval, autoCompleteService, authProvider, conversationHub, $http, globalApiEndPoint, oauthService) {

        $rootScope.$state = $state;
        //whenever a route changes, check if authentication is required, if yes, better redirect to login page
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                if (error === 'Not Authenticated') {
                    event.preventDefault();
                    $rootScope.login();
                }
            });
        //whenever state changes, see if we are in administration area or registered area
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams, error) {
                $rootScope.isAdministrationArea = $window.location.pathname
                    .startsWith($window.Configuration.adminUrlPathPrefix);
                //and scroll to top
                $window.scrollTo(0, 0);
            });

        //execute some theme callbacks on view content loaded
        $rootScope.$on('$viewContentLoaded',
            function(event, viewConfig) {
                if (viewConfig !== "@") {
                    if ($window['viewContentLoaded']) {
                        $window['viewContentLoaded']();
                    }
                }

            });

        $rootScope.$on("$includeContentLoaded",
            function(event, templateName) {
                if ($window['viewContentLoaded']) {
                    $window['viewContentLoaded']();
                }
            });

        oauthService.getAccessToken(function(token) {
            if (token && !token.startsWith("app_")) {
                //set logged in user for use throughout
                $rootScope.CurrentUser = authProvider.getLoggedInUser();
            }
        });
        
        $rootScope.currentUserIs = function(id) {
            return $rootScope.CurrentUser && $rootScope.CurrentUser.Id == id;
        };
        $rootScope.login = function(returnUrl) {
            if (window.location.pathname == "/login")
                return;
            returnUrl = returnUrl || window.location.href;
            //because the returnUrl may be absolute, it's better to explicitly reference the path from url for proper functioning
            var a = document.createElement("a");
            a.href = returnUrl;
            window.location.href = "/login?ReturnUrl=" + encodeURIComponent(a.pathname + a.search);
        };

        $rootScope.displayErrors = function(contextName) {
            var errors = $rootScope._errorMessages[contextName] || $rootScope._errorMessages["_global"];
            if (!errors)
                return "";

            var container = '<div class="alert alert-danger alert-dismissible">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<h4><i class="icon fa fa-ban"></i>Error</h4>' +
                '{MESSAGES}' +
                '</div>';

            var str = "<ul>";
            for (var i = 0; i < errors.length; i++) {
                str += "<li>" + errors[i] + "</li>";
            }
            str += "</ul>";
            return $sce.trustAsHtml(container.replace("{MESSAGES}", str));
        };

        $rootScope.displayMessages = function(contextName) {
            var msgs = $rootScope._responseMessages[contextName] || $rootScope._responseMessages["_global"];
            if (!msgs)
                return "";

            var container = '<div class="alert alert-success alert-dismissible">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<h4><i class="icon fa fa-check"></i>Success</h4>' +
                '{MESSAGES}' +
                '</div>';
            var str = "<ul>";
            for (var i = 0; i < msgs.length; i++) {
                str += "<li>" + msgs[i] + "</li>";
            }
            str += "</ul>";
            return $sce.trustAsHtml(container.replace("{MESSAGES}", str));
        };
        $rootScope._Notifications = function(contextName) {
            return $sce.trustAsHtml($rootScope.displayErrors(contextName) + $rootScope.displayMessages(contextName));
        };
        $rootScope.clearMessages = function() {
            $rootScope._responseMessages = {};
            $rootScope._errorMessages = {};
        };
        $rootScope.clearMessages();

        //helper to wait a callback until the parent scope of provided scope provides it
        $rootScope.waitFromParent = function($scope, objectNameToLookFor, defaultObjectValue) {
            var deferred = $q.defer();
            var checker;
            if ($scope.$parent) {
                //we need to wait for parent to get data. we need objectNameToLookFor to complete the task
                checker = $interval(function() {
                        if ($scope.$parent[objectNameToLookFor]) {
                            $interval.cancel(checker);
                            var returnValue = $scope.$parent[objectNameToLookFor];
                            deferred.resolve(returnValue);
                        } else {
                            return;
                        }
                    },
                    300); //check every 300 ms if anything has been provided by parent
            } else {
                deferred.resolve(defaultObjectValue);
            }
            return deferred.promise;
        };

        $rootScope.videogularConfig = {
            theme: "/plugins/Widgets.mobSocial/app/libraries/videogular/theme/videogular.css",
            preload: "metadata"
        };
        /*
         * Updates videogular source
         */
        $rootScope.updatedVideoSource = function($api, url, mimeType) {
            var source = [
                {
                    src: $sce.trustAsResourceUrl(url),
                    type: mimeType
                }
            ];
            $api.changeSource(source);
            $api.sources = source;
        };

        $rootScope.mentioHelper = {
            userMention: function(term, callback) {
                autoCompleteService.get("users",
                    term /*search term*/,
                    function(response) {
                        if (response.Success) {
                            var mentionedUsers = response.ResponseData.AutoComplete.Users.map(function(element) {
                                return {
                                    label: element.Name, // This gets displayed in the dropdown
                                    item: element // This will get passed to onSelect
                                };
                            });
                            callback(mentionedUsers);
                        }
                    });
            }
        };
        var activeConfigs = {};
        //smart configs for autocomplete
        $rootScope.smartConfig = function(onSelectCallBack, contextName) {
            if (!activeConfigs[contextName]) {
                activeConfigs[contextName] = {
                    user: {
                        autocomplete: [
                            {
                                words: [/@([A-Za-z]+[_A-Za-z0-9]+)/gi],
                                cssClass: 'autocomplete-user-chip'
                            }
                        ],
                        dropdown: [
                            {
                                trigger: /@([_A-Za-z0-9]+)/gi,
                                list: function(match, callback) {
                                    autoCompleteService.get("users",
                                        match[1] /*search term*/,
                                        function(response) {
                                            if (response.Success) {
                                                var users = response.ResponseData.AutoComplete.Users.map(
                                                    function(element) {
                                                        return {
                                                            display:
                                                                element.Name, // This gets displayed in the dropdown
                                                            item: element // This will get passed to onSelect
                                                        };
                                                    });
                                                callback(users);
                                            }
                                        });
                                },
                                onSelect: function(item) {
                                    onSelectCallBack(item);
                                    return item.display;
                                },
                                mode: 'replace'
                            }
                        ]
                    }
                };
            }
            return activeConfigs[contextName];
        };


        $rootScope.AutocompleteCustomer = function(userInputString, timeoutPromise) {
            var response = $http.get(globalApiEndPoint + '/autocomplete/users/get',
                { params: { search: userInputString, excludeLoggedInUser: true } },
                { timeout: timeoutPromise });
            response.success(function(res) {
                if (res.ResponseData.AutoComplete.Users.length == 0 && validateEmail(userInputString)) {
                    //because the response is zero, let's see if it's an email, if it is, we can add it for direct email invitation
                    res.ResponseData.AutoComplete.Users.push({
                        DisplayName: userInputString,
                        Id: userInputString,
                        EmailInvite: true
                    });
                }
            });
            return response;
        };

        $rootScope.checkTokenExpiration = function () {
           
            if (document.cookie.indexOf("mobsocial_reset_token") > 0) {
                //we need to clear the token
                oauthService.clearAccessToken();
                //clear the cookie
                document.cookie = "mobsocial_reset_token=;expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            }
        };
        $rootScope.checkTokenExpiration(); //call immediately
    }
]);

//todo: move to a separate file
function setDataModel(model) {
    window.mobSocial.value("dataModel", model);
}

