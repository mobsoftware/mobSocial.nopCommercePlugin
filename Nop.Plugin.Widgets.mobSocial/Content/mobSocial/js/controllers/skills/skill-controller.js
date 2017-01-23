app.controller("SkillController",
[
    "$scope", "$sce", "SkillService", "AutocompleteService", function ($scope, $sce, SkillService, AutocompleteService) {

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
            SkillService.postSkill(skill,
               function (response) {
                   if (response.Success) {
                       skill = response.Skill;
                       $scope.skill = null;

                       //reorder skills
                       $scope.skills.sort(function(s1, s2) {
                           return s1.DisplayOrder > s2.DisplayOrder;
                       });
                   }
               });
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

        $scope.edit = function (skill) {
            $scope.skills = $scope.skills || [];
            if (!skill) {
                skill = { Id: 0 };
                $scope.skills.push(skill);
            }
            $scope.skill = skill;
        }
        $scope.cancelEdit = function (skill) {
            if (skill.Id == 0 || !skill.Id)
                $scope.skills.pop();
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
            if (callbackObject)
                $scope.skill.SkillName = callbackObject.originalObject.SkillName;
        }

    }
]);