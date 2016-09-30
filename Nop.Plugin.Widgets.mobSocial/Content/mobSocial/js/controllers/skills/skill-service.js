"use strict";

app.service("SkillService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/skills";
    
    this.getUserSkills = function(userId, success, error)
    {
        WebClientService.get(apiEndPoint + "/users/" + userId + "/get", null, success, error);
    }

    this.getSkill = function (skilId, success, error) {
        WebClientService.get(apiEndPoint + "/get/" + skilId, null, success, error);
    }

    this.postSkill = function (skill, success, error) {
        WebClientService.post(apiEndPoint + "/post", skill, success, error);
    }

    this.delete = function (skillId, success, error) {
        WebClientService.delete(apiEndPoint + "/delete/" + skillId, null, success, error);
    }
}]);
