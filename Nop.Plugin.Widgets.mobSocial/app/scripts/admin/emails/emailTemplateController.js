window.mobSocial.lazy.controller("emailTemplateController",
[
    "$scope", "emailTemplateService", "emailAccountService", "$stateParams", function ($scope, emailTemplateService, emailAccountService, $stateParams) {
        $scope.getEmailTemplatesModel = {
            page: 1,
            count: 15
        };
        $scope.getEmailTemplates = function () {
            emailTemplateService.getAll($scope.getEmailTemplatesModel,
                function (response) {
                    if (response.Success) {
                        $scope.emailTemplates = response.ResponseData.EmailTemplates;
                    }
                },
                function () {

                });
        }

        $scope.getEmailTemplate = function (id) {
            id = id || $stateParams.id;

            if (!id || id == 0) {
                $scope.emailTemplate = {};
                //we'll need to query the email accounts and master templates
                emailAccountService.getAll({},
                    function (response) {
                        if (response.Success) {
                            $scope.emailTemplate.AvailableEmailAccounts = response.ResponseData.EmailAccounts
                                .map(function (account) {
                                    return {
                                        Name: account.FromName + " (" + account.Email + ")",
                                        Id: account.Id
                                    };
                                });
                        }
                    },
                    function () {

                    });

                emailTemplateService.getAll({ masterOnly: true},
                    function(response) {
                        if (response.Success) {
                            $scope.emailTemplate.AvailableMasterTemplates = response.ResponseData.EmailTemplates
                                .map(function (template) {
                                    if (template.Id != $scope.emailTemplate.Id)
                                        return {
                                            Name: template.TemplateName,
                                            Id: template.Id
                                        };
                                });
                        }
                    },
                    function() {

                    });
                return;
            }
            emailTemplateService.get(id,
                function (response) {
                    if (response.Success) {
                        $scope.emailTemplate = response.ResponseData.EmailTemplate;
                    }
                },
                function () {

                });
        }

        $scope.save = function () {
            var method = $scope.emailTemplate.Id ? "put" : "post";
            emailTemplateService[method]($scope.emailTemplate,
                function (response) {
                    if (response.Success) {
                        $scope.emailTemplates = $scope.emailTemplates || [];
                        $scope.emailTemplate = response.ResponseData.EmailTemplate;
                        var found = false;
                        //update email account in the list
                        for (var i = 0; i < $scope.emailTemplates.length; i++) {
                            var e = $scope.emailTemplates[i];
                            if (e.Id != $scope.emailTemplate.Id)
                                continue;
                            $scope.emailTemplates[i] = $scope.emailTemplate;
                            found = true;
                            break;
                        }

                        if (!found) {
                            $scope.emailTemplates.push($scope.emailTemplate);
                        }
                    }
                },
                function () {

                });
        }

        $scope.delete = function (id) {
            emailTemplateService.delete(id,
                function (response) {
                    if (response.Success) {
                        //delete email account in the list
                        for (var i = 0; i < $scope.emailTemplates[i]; i++) {
                            var e = $scope.emailTemplates[i];
                            if (e.Id != $scope.emailTemplate.Id)
                                continue;
                            $scope.emailTemplates.splice(i, 1);
                            break;
                        }
                    }
                },
                function () {

                });
        }
    }
]);