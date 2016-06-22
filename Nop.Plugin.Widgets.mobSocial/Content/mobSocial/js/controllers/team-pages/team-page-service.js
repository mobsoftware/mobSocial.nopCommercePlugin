app.service("TeamPageService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {

    var apiEndPoint = globalApiEndPoint + "/teampage";

    this.Insert = function (post, success, error) {
        WebClientService.post(apiEndPoint + "/post", post, success, error);
    }

    this.Update = function (post, success, error) {
        WebClientService.put(apiEndPoint + "/put", post, success, error);
    }

    this.UpdateCover = function (id, pictureId, success, error) {
        WebClientService.put(apiEndPoint + "/cover/put/" + id + "/" + pictureId, null, success, error);
    }

    this.Get = function (id, success, error) {
        WebClientService.get(apiEndPoint + "/get/"+ id, null, success, error);
    }

    this.Delete = function (id, success, error) {
        WebClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    }

    this.InsertGroup = function(post, success, error) {
        WebClientService.post(apiEndPoint + "/group/post", post, success, error);
    }

    this.UpdateGroup = function (post, success, error) {
        WebClientService.put(apiEndPoint + "/group/put", post, success, error);
    }

    this.DeleteGroup = function (id, success, error) {
        WebClientService.delete(apiEndPoint + "/group/delete/" + id, null, success, error);
    }

    this.GetGroups = function (id, success, error) {
        WebClientService.get(apiEndPoint + "/group/get/" + id, null, success, error);
    }

    this.InsertGroupMembers = function(groupIds, memberIds, teamId, success, error) {
        WebClientService.post(apiEndPoint + "/group/members/post",
        {
            GroupId: groupIds,
            CustomerId: memberIds,
            TeamId:teamId
        }, success, error);
    }

    this.DeleteGroupMember = function(groupId, memberId, success, error)
    {
        WebClientService.delete(apiEndPoint + "/group/members/delete/" + groupId + "/" + memberId, null, success, error);
    }
}]);