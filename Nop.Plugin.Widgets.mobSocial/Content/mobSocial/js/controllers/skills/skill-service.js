"use strict";

app.service("SkillService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/skills";

    this.getUserSkills = function (userId, success, error) {
        WebClientService.get(apiEndPoint + "/users/" + userId + "/get", null, success, error);
    }


    this.getSkill = function (skilId, success, error) {
        WebClientService.get(apiEndPoint + "/get/" + skilId, null, success, error);
    }

    this.getSkills = function (options, success, error) {
        WebClientService.get(apiEndPoint + "/get/all", options, success, error);
    }

    this.postSkill = function (skill, success, error) {
        WebClientService.post(apiEndPoint + "/post", skill, success, error);
    }

    this.delete = function (skillId, success, error) {
        WebClientService.delete(apiEndPoint + "/delete/" + skillId, null, success, error);
    }

    this.deleteUserSkill = function (userSkillId, success, error) {
        WebClientService.delete(apiEndPoint + "/users/delete/" + userSkillId, null, success, error);
    }

    this.getSkillBySlug = function (slug, success, error) {
        WebClientService.get(apiEndPoint + "/get/" + slug, null, success, error);
    }

    this.setFeaturedMedia = function (skillId, mediaId, success, error) {
        WebClientService.post(apiEndPoint + "/featured-media", { skillId: skillId, mediaId: mediaId }, success, error);
    }

    this.deleteUserSkillMedia = function (userSkillId, mediaId, success, error) {
        WebClientService
            .delete(apiEndPoint + "/user/media/delete/" + userSkillId + "/" + mediaId, null, success, error);
    }

    this.getUsers = function (skillId, options, success, error) {
        WebClientService.get(apiEndPoint + "/" + skillId + "/users/get", options, success, error);
    }
}]);
