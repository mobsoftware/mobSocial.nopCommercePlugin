window.mobSocial.lazy.controller("skillController",
[
    "$scope", "$sce", "skillService", "autoCompleteService", '$timeout', '$rootScope', '$state', function ($scope, $sce, skillService, autoCompleteService, $timeout, $rootScope, $state) {
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

        $scope.postSkill = function (skill) {
            if (skill.Id < 0)
                skill.Id = 0;
            var isOld = skill.Id > 0;
            skill.Media = null;
            skillService.postSkill(skill,
               function (response) {
                   if (response.Success) {
                       skill = response.ResponseData.Skill;
                       $scope.skill = null;
                       if (!isOld){
                           $scope.skills = $scope.skills || [];
                           $scope.skills.push(skill);
                       }
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

        $scope.uploadSkillMediaSuccess = function (fileItem, data, status, headers) {

            if (data.Success) {
                $scope.skill.MediaId = $scope.skill.MediaId || [];
                if (data.ResponseData.Media) {
                    $scope.skill.MediaId.push(data.ResponseData.Media.Id);
                    $scope.skill.Media.push(data.ResponseData.Media);
                }
                if (data.ResponseData.Images) {
                    for (var i = 0; i < data.ResponseData.Images.length; i++) {
                        $scope.skill.MediaId.push(data.ResponseData.Images[i].Id);
                        $scope.skill.Media = $scope.skill.Media || [];
                        $scope.skill.Media.push(data.ResponseData.Images[i]);
                    }
                }
                
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
                .then(function(user) {
                    $scope.getUserSkills(user.Id);
                });
        };

        var getUsersOptions = {
            nextPage: 0
        };

        $scope.getSkillBySlug = function() {
            var slug = $state.params.slug;
            skillService.getSkillBySlug(slug,
                function(response) {
                    if (response.Success) {
                        $scope.skillData = response.ResponseData.SkillData;
                        $scope.skill =$scope.skillData.Skill;
                        getUsersOptions.nextPage = 2;
                    }
                });

        }
        $scope.getUsers = function() {
            skillService.getUsers($scope.skill.Id, {
                    page: getUsersOptions.nextPage
                },
                function(response) {
                    if (response.Success) {
                        getUsersOptions.nextPage++;
                        if (response.ResponseData.UserSkills.length > 0)
                            $scope.skillData.UserSkills = $scope.skillData.UserSkills.concat(response.ResponseData.UserSkills);
                    }
                });
        }

        $scope.uploadCoverSuccess = function (fileItem, data, status, headers) {

            if (data.Success) {
                $scope.skill.TemporaryFeaturedImageUrl = data.ResponseData.Images[0].Url;
                $scope.skill.TemporaryFeaturedMediaId = data.ResponseData.Images[0].Id;
            }
        };

        $scope.setTemporaryPictureAsCover = function (set) {
            if (set) {
                skillService.setFeaturedMedia($scope.skill.Id,
                    $scope.skill.TemporaryFeaturedMediaId,
                    function(response) {
                        if (response.Success) {
                            $scope.skillData.FeaturedMediaImageUrl = $scope.skill.TemporaryFeaturedImageUrl;
                            $scope.skill.TemporaryFeaturedImageUrl = null;
                            $scope.skill.TemporaryFeaturedMediaId = 0;
                        }
                    });
            } else {
                $scope.skill.TemporaryFeaturedImageUrl = null;
                $scope.skill.TemporaryFeaturedMediaId = 0;
            }
        }

        $scope.deleteUserSkillMedia = function (userSkillId, mediaId) {
            if (!confirm("Are you sure?"))
                return;
            skillService.deleteUserSkillMedia(userSkillId,
                mediaId,
                function(response) {
                    if (response.Success) {
                        if ($scope.skill) {
                            for (var i = 0; i < $scope.skill.Media.length; i++) {
                                if ($scope.skill.Media[i].Id == mediaId)
                                    $scope.skill.Media.splice(i, 1);
                            }
                        }
                    }
                });
        }
    }
]);