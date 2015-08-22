app.service("VideoBattleService", ["$http", function ($http) {

    this.SaveVideoBattle = function (VideoBattle, Success, Error) {

        $http.post("/VideoBattles/SaveVideoBattle", VideoBattle)
            .success(Success)
            .error(Error);
    };

    this.DeleteVideoBattle = function (VideoBattleId, Success, Error) {

        $http.post("/VideoBattles/DeleteVideoBattle", {VideoBattleId: VideoBattleId})
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
  
    this.UpdateParticipantStatus = function (VideoBattleId, ParticipantStatus, ParticipantId, Success, Error) {
        $http.post("/VideoBattles/UpdateParticipantStatus", { VideoBattleId: VideoBattleId, VideoBattleParticipantStatus : ParticipantStatus, ParticipantId : ParticipantId })
           .success(Success)
           .error(Error);
    }

    this.VoteBattle = function (VideoBattleId, ParticipantId, VoteValue, Success, Error) {
        $http.post("/VideoBattles/VoteBattle", { VideoBattleId: VideoBattleId, ParticipantId: ParticipantId, VoteValue: VoteValue })
           .success(Success)
           .error(Error);
    }

    this.GetVideoBattles = function (ViewType, Page, Count, Success, Error) {
        $http.post("/VideoBattles/GetBattles", { ViewType: ViewType, Page: Page, Count: Count })
           .success(Success)
           .error(Error);
    }

    this.InviteVoters = function (VideoBattleId, ParticipantIds, Success, Error) {
        $http.post("/VideoBattles/InviteVoters", { VideoBattleId: VideoBattleId, VoterIds: ParticipantIds })
           .success(Success)
           .error(Error);
    }

    this.JoinBattle = function (VideoBattleId, Success, Error) {
        $http.post("/VideoBattles/JoinBattle", { VideoBattleId: VideoBattleId})
           .success(Success)
           .error(Error);
    }

}]);