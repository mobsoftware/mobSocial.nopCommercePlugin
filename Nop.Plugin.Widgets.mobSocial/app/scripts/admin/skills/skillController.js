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