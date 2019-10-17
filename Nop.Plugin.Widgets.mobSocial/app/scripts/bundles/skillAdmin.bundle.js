webpackJsonp([10,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	module.exports = __webpack_require__(72);


/***/ }),

/***/ 71:
/***/ (function(module, exports) {

	"use strict";

	window.mobSocial.lazy.service("skillService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/skills";
	    
	    this.getUserSkills = function(userId, success, error)
	    {
	        webClientService.get(apiEndPoint + "/users/" + userId + "/get", null, success, error);
	    }


	    this.getSkill = function (skilId, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + skilId, null, success, error);
	    }

	    this.getSkills = function (options, success, error) {
	        webClientService.get(apiEndPoint + "/get/all", options, success, error);
	    }

	    this.postSkill = function (skill, success, error) {
	        webClientService.post(apiEndPoint + "/post", skill, success, error);
	    }

	    this.delete = function (skillId, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + skillId, null, success, error);
	    }

	    this.deleteUserSkill = function(userSkillId, success, error) {
	        webClientService.delete(apiEndPoint + "/users/delete/" + userSkillId, null, success, error);
	    }

	    this.getSkillBySlug = function(slug, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + slug, null, success, error);
	    }

	    this.setFeaturedMedia = function(skillId, mediaId, success, error) {
	        webClientService.post(apiEndPoint + "/featured-media", { skillId: skillId, mediaId: mediaId}, success, error);
	    }

	    this.deleteUserSkillMedia = function(userSkillId, mediaId, success, error) {
	        webClientService
	            .delete(apiEndPoint + "/user/media/delete/" + userSkillId + "/" + mediaId, null, success, error);
	    }

	    this.getUsers = function(skillId, options, success, error) {
	        webClientService.get(apiEndPoint + "/" + skillId + "/users/get", options, success, error);
	    }
	}]);


/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("skillController",
	[
	    "$scope", "$sce", "skillService", "autoCompleteService", '$timeout', '$rootScope', function ($scope, $sce, skillService, autoCompleteService, $timeout, $rootScope) {
	        $scope.skill = null;
	        $scope.getUserSkills = function(userId) {
	            skillService.getUserSkills(userId,
	                function(response) {
	                    if (response.Success) {
	                        $scope.skills = response.ResponseData.Skills;
	                    }
	                });
	        }

	        $scope.getSkill = function(id) {
	            skillService.getSkill(id,
	               function (response) {
	                   if (response.Success) {
	                       $scope.skill = response.Skill;
	                   }
	               });
	        }

	        var options = { page: 0, count: 15 };
	        $scope.getSkills = function (page) {
	            options.page = page || 1;
	            skillService.getSkills(options,
	                function (response) {
	                    if (response.Success) {
	                        $scope.skills = response.ResponseData.Skills;
	                    }
	                });
	        }

	        $scope.postSkill = function (skill) {
	            skill.SystemSkill = true;
	            if (skill.Id < 0)
	                skill.Id = 0;
	            var isOld = skill.Id > 0;
	            skillService.postSkill(skill,
	               function (response) {
	                   if (response.Success) {
	                       skill = response.ResponseData.Skill;
	                       $scope.skill = null;
	                       if (!isOld)
	                           $scope.skills.push(skill);
	                   }
	               });
	        }

	        $scope.delete = function (id) {
	            if (!confirm("Are you sure you wish to delete this skill?"))
	                return;
	            skillService.delete(id,
	               function (response) {
	                   if (response.Success) {
	                       if ($scope.skills && $scope.skill) {
	                           for (var i = 0; i < $scope.skills.length; i++) {
	                               if ($scope.skills[i].Id == $scope.skill.Id) {
	                                   $scope.skills.slice(i, 1);
	                               }
	                           }
	                       }
	                   }
	               });
	        }

	        $scope.deleteUserSkill = function (id) {
	            if (!confirm("Are you sure you wish to delete this skill?"))
	                return;
	            skillService.deleteUserSkill(id,
	               function (response) {
	                   if (response.Success) {
	                       if ($scope.skills) {
	                           for (var i = 0; i < $scope.skills.length; i++) {
	                               if ($scope.skills[i].UserSkillId == id) {
	                                   $scope.skills.slice(i, 1);
	                               }
	                           }
	                       }
	                   }
	               });
	        }

	        $scope.edit = function (skill) {
	           $scope.skill = skill;
	        }

	        $scope.add = function() {
	            $scope.skill = {};
	        }

	        $scope.cancel = function() {
	                $scope.skill = null;
	        }

	        $scope.uploadSkillVideoSuccess = function (fileItem, data, status, headers) {

	            if (data.Success) {
	                $scope.skill.MediaId = data.ResponseData.Media.Id;
	                $scope.skill.Media = data.ResponseData;
	            }
	        };

	        $scope.init = function () {
	            $rootScope.waitFromParent($scope, "CurrentUser", null)
	                   .then(function (CurrentUser) {
	                           $scope.getUserSkills(CurrentUser.Id);
	                   });
	        };

	        $scope.loadProfileSkills = function() {
	            $rootScope.waitFromParent($scope, "user", null)
	                  .then(function (user) {
	                      $scope.getUserSkills(user.Id);
	                  });
	        }
	    }
	]);

/***/ })

});