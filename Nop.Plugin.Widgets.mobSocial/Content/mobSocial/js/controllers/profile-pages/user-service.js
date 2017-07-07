app.service("userService", ["globalApiEndPoint", "WebClientService", "entityPropertyService", function (globalApiEndPoint, webClientService, entityPropertyService) {

    var apiEndPoint = globalApiEndPoint + "/users";
    // get
    this.get = function (userGetModel, success, error) {
        webClientService.get(apiEndPoint + "/get", userGetModel, success, error);
    }

    this.getById = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    }

    this.getBasicInfoById = function (idOrUserName, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/basic", null, success, error);
    }

    this.getFriends = function(idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/friends", options, success, error);
    }
    this.getFollowers = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/followers", options, success, error);
    }
    this.getFollowing = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/following", options, success, error);
    }
    this.getPictures = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/media/image", options, success, error);
    }
    this.getVideos = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/media/video", options, success, error);
    }
    this.post = function(userEntityModel, success, error) {
        webClientService.post(apiEndPoint + "/post", userEntityModel, success, error);
    }

    this.put = function (userEntityModel, success, error) {
        webClientService.put(apiEndPoint + "/put", userEntityModel, success, error);
    }

    this.changePassword = function (passwordModel, success, error) {
        webClientService.put(apiEndPoint + "/put/change-password", passwordModel, success, error);
    }

    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    }

    this.setPictureAs = function (uploadType, pictureId, userId, success, error) {
        entityPropertyService.post({
            propertyName: uploadType,
            value: pictureId,
            entityId: userId,
            entityName: "user"
        },
            success,
            error);
    }

    this.getConfigurations = function (success, error) {
        webClientService.get(apiEndPoint + "/configuration/get", null, success, error);
    }

    this.postConfiguration = function (configurationName, configurationValue, success, error) {
        webClientService.post(apiEndPoint + "/configuration/post/" + configurationName + "/" + configurationValue, null, success, error);
    }

}]);