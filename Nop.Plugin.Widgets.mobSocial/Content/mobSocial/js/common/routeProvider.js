app.factory('routeProvider', [
    function() {
        var routes = {
            "FacebookWebsiteApp": "FacebookWebsiteApp",
            "GetCustomerProfile": "MobSocial/GetCustomerProfile/{customerId}",
            "CustomerProfileUploadPicture": "CustomerProfile/UploadPicture",
            "CustomerProfileSetPictureAsCover": "CustomerProfile/SetPictureAs",
            "PopulateUrlSlugs": "MobSocial/PopulateUrlSlugs",
            "Plugin.Widgets.mobSocial.Configure": "Plugins/mobSocial/Configure",
            "Plugin.Widgets.mobSocial.PublicInfo": "Plugins/mobSocial/PublicInfo",
            "TeamPage": "Team/{teamId}",
            "TeamPageEditor": "TeamPageEditor/{id}",
            "MyTeamPages": "TeamPages",
            "AddFriend": "Friends/AddFriend",
            "FriendButton": "Friends/FriendButton",
            "FriendRequests": "Friends/FriendRequests",
            "GetFriendRequests": "Friends/GetFriendRequests",
            "ConfirmFriend": "Friends/ConfirmFriend",
            "DeclineFriend": "Friends/DeclineFriend",
            "Friends": "Friends/{CustomerId}",
            "SearchPeople": "SearchPeople",
            "PeopleSearchAutoComplete": "MobSocial/SearchTermAutoComplete",
            "EventPageSearchAutoComplete": "EventPage/EventPageSearchAutoComplete",
            "BusinessPageSearchAutoComplete": "BusinessPage/BusinessPageSearchAutoComplete",
            //TODO: Change to new PictureController
            "BusinessPageUploadFile": "BusinessPage/UploadFile/{entityId}/{entityName}",
            "BusinessPageAddPicture": "BusinessPage/AddPicture/{entityId}/{entityName}",
            // TODO: Make business page search url driven from mobSocial settings
            // for use in views
            "BusinessPageSearchUrl": "BusinessPageSearch",
            // admin routes
            "ManageTeamPage": "ManageTeamPage/{action}",
            "ManageEventPage": "ManageEventPage/{action}",
            "MusicSearch": "Music",
            "ArtistSearch": "ArtistSearch",
            "ArtistsPage": "artists/{action}",
            //remote -artists dynamic page creation
            "ArtistPageRemote": "remote-artist/{remoteEntityId}",
            "ArtistPageUploadPicture": "artists/UploadPicture/{ArtistPageId}",
            //remote -songs dynamic page creation
            "SongRemote": "remote-song/{remoteEntityId}",
            "SongsPage": "songs/{action}",
            "SongSearch": "SongSearch",
            "SongPageUploadPicture": "songs/UploadPicture/{SongId}",
            "SongPageUploadSong": "songs/UploadSong/{SongId}",
            "SongPageEditor": "songs/SongEditor/{ArtistPageId}",
            //video battles
            "VideoBattles": "VideoBattles/view/{ViewType}",
            "VideoBattleList": "VideoBattles/GetBattles",
            "VideoBattleEditor": "VideoBattles/Editor/{VideoBattleId}",
            "VideoBattleSave": "VideoBattles/SaveVideoBattle",
            "VideoBattleUploadVideo": "VideoBattles/UploadVideo",
            "VideoBattleUploadPicture": "VideoBattles/UploadPicture",
            "VideoBattleSetPictureAsCover": "VideoBattles/SetPictureAsCover",
            "VideoBattlePage": "VideoBattle/{SeName}/{ViewMode}",
            "VideoBattleInviteParticipants": "VideoBattles/InviteParticipants",
            "VideoBattleInviteVoters": "VideoBattles/InviteVoters",
            "VideoBattleUpdateParticipantStatus": "VideoBattles/UpdateParticipantStatus",
            "VideoBattleVoteBattle": "VideoBattles/VoteBattle",
            "VideoBattleJoinBattle": "VideoBattles/JoinBattle",
            "VideoBattleDelete": "VideoBattles/DeleteVideoBattle",
            "VideoBattleMarkVideoWatched": "VideoBattles/MarkVideoWatched",
            "VideoBattleSavePrize": "VideoBattles/SavePrize",
            "VideoBattleDeletePrize": "VideoBattles/DeletePrize",
            "VideoBattleGetPrizeDetails": "VideoBattles/GetPrizeDetails",
            //payments
            "PaymentFormPopup": "Payment/PaymentFormPopup",
            "AddressFormPopup": "Payment/AddressFormPopup",
            "PurchasePass": "Payment/PurchasePass",
            //sponsors
            "SaveSponsor": "Sponsor/SaveSponsor",
            "UpdateSponsor": "Sponsor/UpdateSponsor",
            "SaveSponsorData": "Sponsor/SaveSponsorData",
            "SponsorDashboard": "SponsorDashboard/{BattleType}/{BattleId}",
            "GetSponsors": "Sponsor/GetSponsors",
            "UploadSponsorPicture": "Sponsor/UploadPicture",
            "SaveSponsorProductPrizes": "Sponsor/SaveSponsorProductPrizes",
            //follow unfollow
            "CustomerFollowEntity": "Follow/{entityName}",
            "CustomerUnfollowEntity": "Unfollow/{entityName}",
            "CustomerFollowButton": "CustomerFollowButton",
            "TimelinePage": "Timeline",
            "ProxyWebFetchUrl": "ProxyWebFetchUrl",
            "CustomerLikeButton": "CustomerLikeButton",
            "CustomerComments": "CustomerComments",
            "SkillsPage": "Skills",
            "SkillPage": "Skill/{seName}",
            "SkillEditorButton": "SkillEditorButton",
            "MediaModal": "MediaModal"
        };

        return {
            routeUrl : function(routeName, params) {
                if (!routes[routeName])
                    return "";
                var routePath = routes[routeName];
                for (var k in params) {
                    if (params.hasOwnProperty(k)) {
                        routePath = routePath.replace("{" + k + "}", params[k]);
                    }
                }
                return "/" + routePath;
            }
        }
    }
]);