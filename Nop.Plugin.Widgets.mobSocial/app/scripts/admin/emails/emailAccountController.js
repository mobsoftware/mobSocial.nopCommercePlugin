window.mobSocial.lazy.controller("emailAccountController",
[
    "$scope", "emailAccountService", "$stateParams", function($scope, emailAccountService, $stateParams) {
        $scope.getEmailAccountsModel = {
            page: 1,
            count: 15
        };
        $scope.getEmailAccounts = function() {
            emailAccountService.getAll($scope.getEmailAccountsModel,
                function(response) {
                    if (response.Success) {
                        $scope.emailAccounts = response.ResponseData.EmailAccounts;
                    }
                },
                function() {

                });
        }

        $scope.getEmailAccount = function (id) {
            id = id || $stateParams.id;
            if (!id)
                return;
            emailAccountService.get(id,
                function(response) {
                    if (response.Success) {
                        $scope.emailAccount = response.ResponseData.EmailAccount;
                    }
                },
                function() {

                });
        }

        $scope.save = function () {
            var method = $scope.emailAccount.Id ? "put" : "post";
            emailAccountService[method]($scope.emailAccount,
                function(response) {
                    if (response.Success) {
                        $scope.emailAccounts = $scope.emailAccounts || [];
                        $scope.emailAccount = response.ResponseData.EmailAccount;
                        var found = false;
                        //update email account in the list
                        for (var i = 0; i < $scope.emailAccounts.length; i++) {
                            var e = $scope.emailAccounts[i];
                            if (e.Id != $scope.emailAccount.Id)
                                continue;
                            $scope.emailAccounts[i] = $scope.emailAccount;
                            found = true;
                            break;
                        }

                        if (!found) {
                            $scope.emailAccounts.push($scope.emailAccount);
                        }
                    }
                },
                function() {

                });
        }

        $scope.delete = function(id) {
            emailAccountService.delete(id,
                function(response) {
                    if (response.Success) {
                        //delete email account in the list
                        for (var i = 0; i < $scope.emailAccounts[i]; i++) {
                            var e = $scope.emailAccounts[i];
                            if (e.Id != $scope.emailAccount.Id)
                                continue;
                            $scope.emailAccounts.splice(i, 1);
                            break;
                        }
                    }
                },
                function() {

                });
        }

        $scope.sendTestEmail = function() {
            emailAccountService.postTestEmail($scope.emailAccount,
                function (response) {
                    if (response.Success) {
                       
                    }
                },
                function () {

                });
        }
    }
]);