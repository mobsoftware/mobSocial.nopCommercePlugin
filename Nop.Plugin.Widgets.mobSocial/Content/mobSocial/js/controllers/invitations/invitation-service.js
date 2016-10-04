"use strict";

app.service("InvitationService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/invitations";


    this.invite = function(invitationRequest, success, error) {
        WebClientService.post(apiEndPoint + "/post", invitationRequest, success, error);
    };


}]);
