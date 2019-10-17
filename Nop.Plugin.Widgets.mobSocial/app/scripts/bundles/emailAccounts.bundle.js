webpackJsonp([4,17],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	module.exports = __webpack_require__(16);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("emailAccountService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/emailaccounts";
	    this.post = function (emailAccount, success, error) {
	        webClientService.post(apiEndPoint + "/post", emailAccount, success, error);
	    };

	    this.put = function (emailAccount, success, error) {
	        webClientService.put(apiEndPoint + "/put", emailAccount, success, error);
	    };

	    this.delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    };

	    this.getAll = function (emailAccountRequest, success, error) {
	        webClientService.get(apiEndPoint + "/get", emailAccountRequest, success, error);
	    };

	    this.get = function (id, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
	    };

	    this.postTestEmail = function (emailAccount, success, error) {
	        webClientService.post(apiEndPoint + "/test-email/post", emailAccount, success, error);
	    };

	}]);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

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

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("emailTemplateService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/emailtemplates";
	    this.post = function (emailTemplate, success, error) {
	        webClientService.post(apiEndPoint + "/post", emailTemplate, success, error);
	    };

	    this.put = function (emailTemplate, success, error) {
	        webClientService.put(apiEndPoint + "/put", emailTemplate, success, error);
	    };

	    this.delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    };

	    this.getAll = function (emailTemplateRequest, success, error) {
	        webClientService.get(apiEndPoint + "/get", emailTemplateRequest, success, error);
	    };

	    this.get = function (id, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
	    };
	}]);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

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

/***/ })
]);