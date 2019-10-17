window.mobSocial.lazy.service("settingService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

    var apiEndPoint = globalApiEndPoint + "/settings";
    // get
    this.get = function (settingType, success, error) {
        webClientService.get(apiEndPoint + "/get/" + settingType, null, success, error);
    }

    this._post = function (settingType, entityModel, success, error) {
        webClientService.post(apiEndPoint + "/post/" + settingType, entityModel, success, error);
    }
    this.postGeneralSettings = function (entityModel, success, error) {
        this._post("general", entityModel, success, error);
    }
    this.postMediaSettings = function (entityModel, success, error) {
        this._post("media", entityModel, success, error);
    }
    this.postSecuritySettings = function (entityModel, success, error) {
        this._post("security", entityModel, success, error);
    }
    this.postThirdPartySettings = function (entityModel, success, error) {
        this._post("thirdparty", entityModel, success, error);
    }
    this.postUserSettings = function (entityModel, success, error) {
        this._post("user", entityModel, success, error);
    }
    this.postPaymentSettings = function (entityModel, success, error) {
        this._post("payment", entityModel, success, error);
    }
    this.postDateTimeSettings = function (entityModel, success, error) {
        this._post("datetime", entityModel, success, error);
    }
    this.postBattleSettings = function (entityModel, success, error) {
        this._post("battle", entityModel, success, error);
    }
    this.postUrlSettings = function (entityModel, success, error) {
        this._post("url", entityModel, success, error);
    }
    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    }
}]);