app.service("VideoBattleService", ["globalApiEndPoint", "WebClientService", "$http", function (globalApiEndPoint, WebClientService, $http) {

    var apiEndPoint = globalApiEndPoint + "/videobattles";
    // edit/5
    this.GetBattleEditor = function (battleEditorModel, success, error) {
        WebClientService.get(apiEndPoint + "/edit/" + battleEditorModel.Id, null, success, error);
    }

    // get/battle-slug/view-mode
    this.GetBattle = function(battleIndexModel, success, error) {
        WebClientService.get(apiEndPoint + "/get/" + battleIndexModel.SeName + "/" + battleIndexModel.ViewMode, null, success, error);
    }

    this.SaveVideoBattle = function (VideoBattle, success, error) {
        WebClientService.post(apiEndPoint + "/savebattle", VideoBattle, success, error);
    };
    // deletevideobattle/videobattleid
    this.DeleteVideoBattle = function (VideoBattleId, success, error) {
        WebClientService.delete(apiEndPoint + "/deletevideobattle/" + VideoBattleId, null, success, error);
    };

    this.searchAPI = function (userInputString, timeoutPromise) {
        return $http.get(globalApiEndPoint + '/mobsocial/searchtermautocomplete', { params: { term: userInputString } }, { timeout: timeoutPromise });
    }

    this.InviteParticipants = function (VideoBattleId, ParticipantIds, Emails, success, error) {
        WebClientService.post(apiEndPoint + "/inviteparticipants", { VideoBattleId: VideoBattleId, ParticipantIds: ParticipantIds, Emails: Emails }, success, error);
    }
  
    this.UpdateParticipantStatus = function (VideoBattleId, ParticipantStatus, ParticipantId, success, error) {
        WebClientService.post(apiEndPoint + "/updateparticipantstatus", { VideoBattleId: VideoBattleId, VideoBattleParticipantStatus: ParticipantStatus, ParticipantId: ParticipantId }, success, error);
    }

    this.VoteBattle = function (VideoBattleId, ParticipantId, VoteValue, VoterPassOrderId, success, error) {
        WebClientService.post(apiEndPoint + "/votebattle", { VideoBattleId: VideoBattleId, ParticipantId: ParticipantId, VoteValue: VoteValue, VoterPassOrderId: VoterPassOrderId }, success, error);
    }

    this.GetVideoBattles = function (query, success, error) {
        WebClientService.get(apiEndPoint + "/getbattles", query, success, error);
    }

    this.InviteVoters = function (VideoBattleId, ParticipantIds, Emails, success, error) {
        WebClientService.post(apiEndPoint + "/invitevoters", { VideoBattleId: VideoBattleId, VoterIds: ParticipantIds, Emails: Emails }, success, error);
    }

    this.JoinBattle = function (VideoBattleId, success, error) {
        WebClientService.post(apiEndPoint + "/joinbattle/" + VideoBattleId, null, success, error);
    }

    this.MarkVideoWatched = function (VideoBattleId, ParticipantId, VideoBattleVideoId, success, error) {
        WebClientService.post(apiEndPoint + "/markvideowatched", { VideoBattleId: VideoBattleId, ParticipantId: ParticipantId, VideoBattleVideoId: VideoBattleVideoId }, success, error);
    }

    this.SetPictureAsCover = function (VideoBattleId, PictureId, success, error) {
        WebClientService.post(apiEndPoint + "/setpictureascover", { VideoBattleId: VideoBattleId, PictureId: PictureId }, success, error);
    }

    this.SavePrize = function (Prize, success, error) {
        WebClientService.post(apiEndPoint + "/saveprize", Prize, success, error);}

    // deleteprize/videobattleid/prizeid
    this.DeletePrize = function (prize, success, error) {
        WebClientService.delete(apiEndPoint + "/deleteprize/" + prize.VideoBattleId + "/" + prize.Id, null, success, error);
    }
    // 5/getprizedetails
    this.GetPrizeDetails = function (VideoBattleId, success, error) {
        WebClientService.get(apiEndPoint + "/" + VideoBattleId + "/getprizedetails", { VideoBattleId: VideoBattleId }, success, error);
    }
   
}]);