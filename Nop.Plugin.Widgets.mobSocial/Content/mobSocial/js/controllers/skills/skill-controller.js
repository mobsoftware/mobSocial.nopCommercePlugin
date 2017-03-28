
appRequires(["ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster",
			"com.2fdevs.videogular.plugins.imaads", 'timer']);

app.controller("SkillController",
[
    "$scope", "$sce", "SkillService", "AutocompleteService", '$timeout', '$rootScope', function ($scope, $sce, SkillService, AutocompleteService, $timeout, $rootScope) {

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
                       if (!isOld) {
                           $scope.skills = $scope.skills || [];
                           $scope.skills.push(skill);
                       } else {
                           for (var i = 0; i < $scope.skills.length; i++) {
                               if ($scope.skills[i].UserSkillId == skill.UserSkillId) {
                                   $scope.skills[i] = skill;
                                   break;
                               }
                           }
                       }
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
            $scope.$broadcast('angucomplete-alt:changeInput', 'skill-autocomplete', skill.SkillName);
            $scope.skill = skill;
            $rootScope.bodyScroll(false);
        }

        $scope.add = function () {
            $scope.skill = {};
            $rootScope.bodyScroll(false);
        }

        $scope.cancel = function () {
            $scope.skill = null;
            $rootScope.bodyScroll(true);
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
                if (data.Video) {
                    $scope.skill.MediaId.push(data.Video.Id);
                    $scope.skill.Media = $scope.skill.Media || [];
                    $scope.skill.Media.push(data.Video);
                }
            }
        };


        $scope.cancelEdit = function () {
            $scope.skill = null;
            $scope.$broadcast('angucomplete-alt:clearInput', 'skill-autocomplete');
            $rootScope.bodyScroll(true);
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

        var getUsersOptions = {
            nextPage: 0
        };

        $scope.getSkillBySlug = function (slug) {
            SkillService.getSkillBySlug(slug,
                function (response) {
                    if (response.Success) {
                        $scope.skillData = response.SkillData;
                        $scope.skill = $scope.skillData.Skill;
                        getUsersOptions.nextPage = 2;
                    }
                });

        }
        $scope.getUsers = function () {
            SkillService.getUsers($scope.skill.Id, {
                page: getUsersOptions.nextPage
            },
                function (response) {
                    if (response.Success) {
                        getUsersOptions.nextPage++;
                        if (response.ResponseData.UserSkills.length > 0)
                            $scope.skillData.UserSkills = $scope.skillData.UserSkills.concat(response.ResponseData.UserSkills);
                    }
                });
        }

        $scope.uploadCoverSuccess = function (fileItem, data, status, headers) {

            if (data.Success) {
                $scope.skill.TemporaryFeaturedImageUrl = data.Images[0].Url;
                $scope.skill.TemporaryFeaturedMediaId = data.Images[0].Id;
            }
        };

        $scope.setTemporaryPictureAsCover = function (set) {
            if (set) {
                SkillService.setFeaturedMedia($scope.skill.Id,
                    $scope.skill.TemporaryFeaturedMediaId,
                    function (response) {
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
            SkillService.deleteUserSkillMedia(userSkillId,
                mediaId,
                function (response) {
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