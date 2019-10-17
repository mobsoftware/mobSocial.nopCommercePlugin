window.mobSocial.lazy.controller("userEditController", [
   "$scope", "userService", "$stateParams", "$state", "authProvider", "$rootScope", "roleService", function ($scope, userService, $stateParams, $state, authProvider, $rootScope, roleService) {

       roleService.get(function (response) {
            if (response.Success) {
                var roles = response.ResponseData.Roles;
                $scope.AvailableRoles = roles;
            }
            

        });

       $scope.get = function () {
           var userId = $stateParams.id || $rootScope.CurrentUser.Id;
           if (!userId || userId == 0) {
               console.log($scope.$parent);
               $rootScope.waitFromParent($scope,
                   "CurrentUser",
                   function(user) {
                       $scope.user = user;
                       alert("and so set");
                   });
               return;
           }
           userService.getById(userId,
               function (response) {
                   if (response.Success) {
                       $scope.user = response.ResponseData.User;
                   }
               },
               function (response) {

               });
       }

       $scope.saveFull = function () {
           userService.post($scope.user,
               function (response) {
                   if (response.Success) {
                       $scope.user = response.ResponseData.User;
                       if ($scope.user.Id == $rootScope.CurrentUser.Id) {
                           authProvider.markLoggedIn($scope.user);
                       }
                   }
               },
               function (response) {

               });
       }

       $scope.save = function () {
           userService.put($scope.user,
               function (response) {
                   if (response.Success) {
                       $scope.user = response.ResponseData.User;
                       if ($scope.user.Id == $rootScope.CurrentUser.Id) {
                           authProvider.markLoggedIn($scope.user);
                       }
                   }
               },
               function (response) {

               });
       }

       $scope.changePassword = function () {
           
           if ($scope.user.Password != $scope.user.ConfirmPassword) {
               alert("The passwords do not match");
               return;
           }
           userService.changePassword({
                   password: $scope.user.Password,
                   confirmPassword: $scope.user.ConfirmPassword
               },
               function(response) {

               },
               function(resonse) {

               });
       }

       $scope.delete = function () {
           mobConfirm("Are you sure you wish to delete this user?",
               function (result) {
                   if (!result)
                       return;
                   userService.delete($scope.user.Id,
                       function (response) {
                           if (response.Success) {
                               $state.go("layoutAdministration.users.list");
                           }
                       },
                       function (response) {

                       });
               });
       }

       $scope.uploadProfilePictureSuccess = function (fileItem, data, status, headers) {
           if (data.Success && data.ResponseData.Images.length > 0) {
               $scope.user.ProfileImageId = data.ResponseData.Images[0].ImageId;
               $scope.user.ProfileImageUrl = data.ResponseData.Images[0].ThumbnailUrl;
           }
       };

       $scope.init = function () {
           $scope.user = {

           };
           //request data
           $scope.get();
       };
       $scope.init();
   }
]);