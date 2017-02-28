app.controller("SkillController",
[
    "$scope", "$sce", "SkillService", "AutocompleteService", '$timeout', function ($scope, $sce, SkillService, AutocompleteService, $timeout) {

        $scope.getUserSkills = function(userId) {
            SkillService.getUserSkills(userId,
                function(response) {
                    if (response.Success) {
                        $scope.skills = response.Skills;
                    }
                });
        }

        $scope.getSkill = function(id) {
            SkillService.getSkill(id,
               function (response) {
                   if (response.Success) {
                       $scope.skill = response.Skill;
                   }
               });
        }

        $scope.postSkill = function (skill) {
            if (skill.Id < 0)
                skill.Id = 0;
            var isOld = skill.Id > 0;
            skill.Media = null;
            SkillService.postSkill(skill,
               function (response) {
                   if (response.Success) {
                       skill = response.Skill;
                       $scope.skill = null;
                       if (!isOld)
                           $scope.skills = $scope.skills || [];
                       $scope.skills.push(skill);
                   }
               }
            );
        }

        $scope.delete = function (id) {
            if (!confirm("Are you sure you wish to delete this skill?"))
                return;
            SkillService.delete(id,
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
            SkillService.deleteUserSkill(id,
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

        $scope.add = function () {
            $scope.skill = {};
        }

        $scope.cancel = function () {
            $scope.skill = null;
        }

        $scope.uploadSkillMediaSuccess = function (fileItem, data, status, headers) {

            if (data.Success) {
                $scope.skill.MediaId = $scope.skill.MediaId || [];
                if (data.Media) {
                    $scope.skill.MediaId.push(data.Media.Id);
                    $scope.skill.Media.push(data.Media);
                }
                if (data.Images) {
                    for (var i = 0; i < data.Images.length; i++) {
                        $scope.skill.MediaId.push(data.Images[i].Id);
                        $scope.skill.Media = $scope.skill.Media || [];
                        $scope.skill.Media.push(data.Images[i]);
                    }
                }

            }
        };


        $scope.cancelEdit = function () {
            $scope.skill = null;
            $scope.$broadcast('angucomplete-alt:clearInput', 'skill-autocomplete');
        }

        $scope.autocompleteSkills = function (userInputString, timeoutPromise) {
            var response = AutocompleteService.autocomplete("skills", userInputString, timeoutPromise);
            response.success(function (res) {
                if (res.AutoComplete.Skills.length == 0) {
                    res.AutoComplete.Skills.push({
                        SkillName: userInputString
                    });
                }
                return res.AutoComplete.Skills;
            });
            return response;
        }

        $scope.selectSkill = function (callbackObject) {
            if (callbackObject) {
                $scope.skill.SkillName = callbackObject.originalObject.SkillName;
                $scope.skill.Id = callbackObject.originalObject.Id;
            }
        }

    }
]);