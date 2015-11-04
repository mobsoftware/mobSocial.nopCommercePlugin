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

    this.InviteParticipants = function(VideoBattleId, ParticipantIds, Emails, Success, Error) {
        $http.post("/VideoBattles/InviteParticipants", {VideoBattleId: VideoBattleId, ParticipantIds: ParticipantIds,Emails: Emails})
           .success(Success)
           .error(Error);
    }
  
    this.UpdateParticipantStatus = function (VideoBattleId, ParticipantStatus, ParticipantId, Success, Error) {
        $http.post("/VideoBattles/UpdateParticipantStatus", { VideoBattleId: VideoBattleId, VideoBattleParticipantStatus : ParticipantStatus, ParticipantId : ParticipantId })
           .success(Success)
           .error(Error);
    }

    this.VoteBattle = function (VideoBattleId, ParticipantId, VoteValue, VoterPassOrderId, Success, Error) {
        $http.post("/VideoBattles/VoteBattle", { VideoBattleId: VideoBattleId, ParticipantId: ParticipantId, VoteValue: VoteValue, VoterPassOrderId: VoterPassOrderId })
           .success(Success)
           .error(Error);
    }

    this.GetVideoBattles = function (ViewType, Page, Count, Success, Error) {
        $http.post("/VideoBattles/GetBattles", { ViewType: ViewType, Page: Page, Count: Count })
           .success(Success)
           .error(Error);
    }

    this.InviteVoters = function (VideoBattleId, ParticipantIds,Emails, Success, Error) {
        $http.post("/VideoBattles/InviteVoters", { VideoBattleId: VideoBattleId, VoterIds: ParticipantIds,Emails: Emails })
           .success(Success)
           .error(Error);
    }

    this.JoinBattle = function (VideoBattleId, Success, Error) {
        $http.post("/VideoBattles/JoinBattle", { VideoBattleId: VideoBattleId})
           .success(Success)
           .error(Error);
    }

    this.MarkVideoWatched = function (VideoBattleId, ParticipantId, VideoBattleVideoId, Success, Error) {
        $http.post("/VideoBattles/MarkVideoWatched", { VideoBattleId: VideoBattleId, ParticipantId: ParticipantId, VideoBattleVideoId: VideoBattleVideoId })
          .success(Success)
          .error(Error);
    }

    this.SavePrize = function (Prize, Success, Error) {
        $http.post("/VideoBattles/SavePrize", Prize)
          .success(Success)
          .error(Error);
    }
    this.DeletePrize = function (Prize, Success, Error) {
        $http.post("/VideoBattles/DeletePrize", Prize)
          .success(Success)
          .error(Error);
    }
   
}]);