app.controller("SkillController",
[
    "$scope", "$sce", "SkillService", function($scope, $sce, SkillService) {

        $scope.getUserSkills = function(userId) {
            SkillService.getUserSkills(userId,
                function(response) {
                    if (response.Success) {
                        $scope.userSkills = response.UserSkills;
                    }
                });
        }

        $scope.getSkill = function(id) {
            SkillService.getSkill(id,
               function (response) {
                   if (response.Success) {
                       $scope.skill = response.UserSkill;
                   }
               });
        }

        $scope.postSkill = function (id) {
            SkillService.postSkill(id,
               function (response) {
                   if (response.Success) {
                       $scope.skill = response.UserSkill;
                   }
               });
        }

        $scope.delete = function (id) {
            SkillService.delete(id,
               function (response) {
                   if (response.Success) {
                       if ($scope.userSkills && $scope.skill) {
                           for (var i = 0; i < $scope.userSkills.length; i++) {
                               if ($scope.userSkills[i].Id == $scope.skill.Id) {
                                   $scope.userSkills.slice(i, 1);
                               }
                           }
                       }
                   }
               });
        }
    }
]);