app.service("VideoBattleService", ["$http", function ($http) {

    this.SaveVideoBattle = function (VideoBattle, Success, Error) {

        $http.post("/VideoBattles/SaveVideoBattle", VideoBattle)
            .success(Success)
            .error(Error);
    };

    this.searchAPI = function (userInputString, timeoutPromise) {
        return $http.post('/MobSocial/SearchTermAutoComplete/', { term: userInputString }, { timeout: timeoutPromise });
    }

    this.InviteParticipants = function(VideoBattleId, ParticipantIds, Success, Error) {
        $http.post("/VideoBattles/InviteParticipants", {VideoBattleId: VideoBattleId, ParticipantIds: ParticipantIds})
           .success(Success)
           .error(Error);
    }
  
    this.UpdateParticipantStatus = function (VideoBattleId, ParticipantStatus, Success, Error) {
        $http.post("/VideoBattles/UpdateParticipantStatus", { VideoBattleId: VideoBattleId, VideoBattleParticipantStatus : ParticipantStatus })
           .success(Success)
           .error(Error);
    }

}]);