app.config(["$stateProvider",
    "$urlRouterProvider",
    "$locationProvider",
    "$controllerProvider",
    "$compileProvider",
    "$filterProvider",
    "$provide",
     function ($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provider) {
         var adminPrefix = "admin";
         app.lazy = {
             controller: $controllerProvider.register,
             directive: $compileProvider.directive,
             filter: $filterProvider.register,
             factory: $provider.factory,
             service: $provider.service
         };

         $stateProvider
             .state("layoutZero",
             {
                 abstract: true,
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/layouts/_layout-none.html"
             })
             .state("layoutZero.login",
             {
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/login.html",
                 url: "/login",
                 controller: "loginController"
             })
             .state("layoutZero.register",
             {
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/common/register.html",
                 url: "/register",
                 resolve: {
                     resolver: ["controllerProvider", function (controllerProvider) {
                         return controllerProvider.resolveBundles(["register"]);
                     }]
                 },
                 controller: "registerController"
             })
             .state("layoutZero.activate",
             {
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/common/activate.html",
                 url: "/activate?code",
                 resolve: {
                     resolver: ["controllerProvider", function (controllerProvider) {
                         return controllerProvider.resolveBundles(["register"]);
                     }]
                 },
                 controller: "registerController"
             })
            .state("layoutZero.install",
             {
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/common/install.html",
                 url: "/install",
                 controller: "installController",
                 resolve: {
                     resolver: ["controllerProvider", function (controllerProvider) {
                         return controllerProvider.resolveBundles(["install"]);
                     }]
                 }
             });
         $stateProvider
             .state("layoutAdministration",
             {
                 abstract: true,
                 resolve: {
                     auth: ["authProvider", function(authProvider) {
                         return authProvider.isLoggedIn();
                     }]
                 },
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/layouts/_layout-administration.html"
             })
             .state("layoutAdministration.dashboard",
             {
                 url: adminPrefix,
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/dashboard.html"
             })
             .state("layoutAdministration.users",
             {
                 abstract: true,
                 url: adminPrefix + "/users",
                 template: "<div ui-view></div>",
                 resolve: {
                     resolver: ["controllerProvider",function(controllerProvider) {
                         return controllerProvider.resolveBundles(["fileUpload", "users"]);
                     }]
                 }
             })
             .state("layoutAdministration.users.list",
             {
                 url: '',
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/users/users.list.html",
                 controller: "userController"
             })
             .state("layoutAdministration.users.edit",
             {
                 abstract: true,
                 url: "/edit/:id",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/users/user.edit.html",
                 controller: "userEditController"
             })
             .state('layoutAdministration.users.edit.basic',
             {
                 url: '',
                 templateUrl: '/Plugins/Widgets.mobSocial/app/pages/users/user.edit.basic.html'
             })
             .state('layoutAdministration.users.edit.timeline',
             {
                 url: '/timeline',
                 templateUrl: '/Plugins/Widgets.mobSocial/app/pages/users/user.edit.timeline.html'
             })
             .state("layoutAdministration.settings",
             {
                 url: adminPrefix + "/settings/:settingType",
                 templateUrl: function(stateParams) {
                     return "/Plugins/Widgets.mobSocial/app/pages/settings/" + stateParams.settingType + "Settings.edit.html";
                 },
                 controllerProvider: ["$stateParams",function($stateParams) {
                     if (!$stateParams.settingType)
                         return "settingEditController";
                     switch ($stateParams.settingType) {
                     default:
                         return "settingEditController";

                     }
                 }],
                 resolve: {
                     resolver: ["controllerProvider",function(controllerProvider) {
                         return controllerProvider.resolveBundles(["settings"]);
                     }]
                 }
             })
             .state("layoutAdministration.emails",
             {
                 abstract: true,
                 url: adminPrefix + "/emails",
                 template: "<div ui-view></div>",
                 resolve: {
                     resolver: ["controllerProvider",function (controllerProvider) {
                         return controllerProvider.resolveBundles(["emailAccounts"]);
                     }]
                 }
             })
             .state("layoutAdministration.emails.accountlist",
             {
                 url: "/emailaccounts",
                 controller: "emailAccountController",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/emails/emailAccount.list.html"
             })
             .state("layoutAdministration.emails.accountedit",
             {
                 url: "/emailaccount/:id",
                 controller: "emailAccountController",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/emails/emailAccount.editor.html"
             })
            .state("layoutAdministration.emails.templatelist",
             {
                 url: "/emailtemplates",
                 controller: "emailTemplateController",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/emails/emailTemplate.list.html"
             })
             .state("layoutAdministration.emails.templateedit",
             {
                 url: "/emailtemplate/:id",
                 controller: "emailTemplateController",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/emails/emailTemplate.editor.html"
             })
             .state("layoutAdministration.skills",
             {
                 abstract: true,
                 url: adminPrefix + "/skills",
                 template: "<div ui-view></div>",
                 resolve: {
                     resolver: ["controllerProvider",function (controllerProvider) {
                         return controllerProvider.resolveBundles(["skillAdmin"]);
                     }]
                 }
             })
            .state("layoutAdministration.skills.list",
             {
                 url: "",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/skills/skill.list.html",
                 controller: "skillController"
             });

         $stateProvider
             .state("layoutMobSocial",
             {
                 abstract: true,
                 url: "",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/layouts/_layout-mobsocial.html"
             })
             .state("layoutMobSocial.activity",
             {
                 url: "/social",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/users/activity.html",
                 resolve: {
                     resolver: ["controllerProvider",function (controllerProvider) {
                         return controllerProvider
                             .resolveBundles(["videogular", "social", "fileUpload", "users", "timeline", "education", "skillPublic"]);
                     }]
                 }
             })
             .state("layoutMobSocial.userprofile",
             {
                 abstract: true,
                 url: "/u/:idOrUserName?tab",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/users/user.profile.html",
                 resolve: {
                     resolver: ["controllerProvider",function (controllerProvider) {
                         return controllerProvider
                             .resolveBundles(["videogular", "social", "media", "fileUpload", "users", "timeline", "skillPublic"]);
                     }]
                 }
             })
             .state("layoutMobSocial.userprofile.tabs",
             {
                 url: "",
                 templateProvider: ['$stateParams', '$templateFactory', function ($stateParams, $templateFactory) {
                     if ([undefined, "main", "pictures", "videos", "friends", "followers", "following", "skills"].indexOf($stateParams.tab) == -1) {
                         return $templateFactory.fromUrl("/Plugins/Widgets.mobSocial/app/pages/common/404.html");
                     }
                     return $templateFactory.fromUrl("/Plugins/Widgets.mobSocial/app/pages/users/user.profile." +
                         ($stateParams.tab || "main") +
                         ".html");
                 }]
             })
            .state("layoutMobSocial.skill",
             {
                 url: "/skill/:slug",
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/skills/skill.single.html",
                 resolve: {
                     resolver: ["controllerProvider",function (controllerProvider) {
                         return controllerProvider
                             .resolveBundles(["videogular", "social", "media", "fileUpload", "skillPublic"]);
                     }]
                 },
                 controller: "skillController"
             });

         $stateProvider
             .state("layoutMobSocial.twoColumns",
             {
                 abstract: true,
                 templateUrl: "/Plugins/Widgets.mobSocial/app/pages/layouts/_layout-mobsocial-two-columns.html"
             })
             .state("layoutMobSocial.twoColumns.editProfile",
             {
                 url: "/edit-profile/?tab",
                 resolve: {
                     resolver: ["controllerProvider",function (controllerProvider) {
                         return controllerProvider
                             .resolveBundles(["videogular", "fileUpload", "media", "users", "education", "skillPublic"]);
                     }]
                 },
                 views: {
                     "left": {
                         templateUrl: "/Plugins/Widgets.mobSocial/app/pages/users/user.profile.edit.navigation.html"
                     },
                     "right": {
                         templateProvider: ["$state", "$templateFactory", function ($state, $templateFactory) {
                             if ([undefined, "basic", "education", "skills"].indexOf($state.tab) == -1) {
                                 return $templateFactory.fromUrl("/Plugins/Widgets.mobSocial/app/pages/common/404.html");
                             }
                             return $templateFactory.fromUrl("/Plugins/Widgets.mobSocial/app/pages/users/user.profile.edit." + ($state.params.tab || "basic") + ".html");
                         }],
                         resolve: {
                             resolver: ["controllerProvider",function (controllerProvider) {
                                 return controllerProvider
                                     .resolveBundles(["education", "skillPublic"]);
                             }]
                         },
                         controllerProvider: ["$state",function($state) {
                             if (!$state.params.tab)
                                 return "userEditController";
                             switch($state.params.tab) {
                                 case "basic":
                                     return "userEditController";
                                 case "education":
                                     return "educationController";
                                 case "skills":
                                     return "skillController";

                             }
                         }]
                     }
                 }
             });
         $stateProvider
             .state("layoutApplication",
                 {
                     abstract: true,
                     url: "/apps",
                     templateUrl: "/Plugins/Widgets.mobSocial/app/pages/layouts/_layout-application.html",
                     resolve: {
                         auth: ["authProvider",function (authProvider) {
                             return authProvider.isLoggedIn();
                         }]
                     },
                 })
             .state("layoutApplication.twoColumns",
                 {
                     abstract: true,
                     templateUrl: "/Plugins/Widgets.mobSocial/app/pages/layouts/_layout-mobsocial-two-columns.html",
                     resolve: {
                         resolver: ["controllerProvider",function (controllerProvider) {
                             return controllerProvider
                                 .resolveBundles(["applicationPublic"]);
                         }]
                     }
             })
             .state("layoutApplication.twoColumns.listApplications",
                 {
                     url: "",
                     views: {
                         "left" : {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.navigation.html"
                         },
                         "right" : {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.list.html"
                         }
                     }
             })
             .state("layoutApplication.twoColumns.editApplication",
                 {
                     url: "/edit/?id",
                     views: {
                         "left": {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.navigation.html"
                         },
                         "right": {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.edit.html"
                         }
                     }
             })
             .state("layoutApplication.twoColumns.logins",
                 {
                     url: "",
                     views: {
                         "left": {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.navigation.html"
                         },
                         "right": {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.logins.html"
                         }
                     }
             })
             .state("layoutApplication.twoColumns.listCustomFields",
                 {
                     url: "/:id/custom-fields/:type",
                     resolve: {
                         resolver: ["controllerProvider", function (controllerProvider) {
                             return controllerProvider
                                 .resolveBundles(["customField"]);
                         }]
                     },
                     views: {
                         "left": {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.customfields.navigation.html",
                             controller: ["applicationService", "$scope", "$state", function(applicationService, $scope, $state) {
                                 applicationService.getById($state.params.id,
                                     function(response) {
                                         $scope.application = response.ResponseData.Application;
                                     });
                             }]
                         },
                         "right": {
                             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/applications/application.customfields.list.html"
                         }
                     }
                 });
         $stateProvider.state("layoutZero.404",
         {
             templateUrl: "/Plugins/Widgets.mobSocial/app/pages/common/404.html"
         });
         $urlRouterProvider.otherwise(function ($injector, $location) {
             
             var state = $injector.get('$state');
             state.go('layoutZero.404');
             return $location.path();
         });

         // use the HTML5 History API
         $locationProvider.html5Mode(true);

     }]);