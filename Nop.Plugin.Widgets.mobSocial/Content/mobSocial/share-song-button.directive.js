app.directive("shareSongButton", ['$http', '$compile', 'dialogService', function ($http, $compile, dialogService) {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, elem, attr) {

            elem.bind("click", function () {
                var dialogId = "share-song-dialog-" + attr.trackid + "_" + attr.remotetrackid;
                if ($("#" + dialogId).length == 0) {
                    $(elem).after("<div id='" + dialogId + "' title='Share Song'>Please wait...</div>");

                }
                dialogService.open(dialogId)

                //first lets go to our server to get the preview url
                $http.get("/songs/ShareSong?TrackId=" + attr.trackid + "&RemoteTrackId=" + attr.remotetrackid)
                         .success(function (data, status, headers, config) {
                             if (status == 200) {
                                
                                 $("#" + dialogId).html(data);
                                 $compile($("#" + dialogId))(scope);
                                
                             }
                });

              
            });
        }
    };
}]);