app.directive("mobPreviewSongButton", ['$http', '$rootScope', 'ngAudio', function ($http, $rootScope, ngAudio) {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, elem, attr) {

            elem.bind("click", function () {
                var playText = "Play";
                var pauseText = "Pause";

                //first check if its a pause action
                if ($rootScope.audio) {

                    if ($rootScope.activeTrack == attr.trackid) {
                        if ($rootScope.audio.paused){
                            $rootScope.audio.play();
                            elem.html(pauseText);
                        }
                        else {
                            $rootScope.audio.pause();
                            elem.html(playText);

                        }
                        return;
                    }
                    else {
                        if ($rootScope.activePlayer)
                            $rootScope.activePlayer.html(playText); //change text of any other link that was playing
                    }
                    $rootScope.audio.pause();//pause any active track
                    $rootScope.activePlayer = null;
                    $rootScope.activeTrack = null;
                   
                }

                

                //first lets go to our server to get the preview url
                $http.post("/artists/GetArtistSongPreviewUrl", { TrackId: attr.trackid })
                         .success(function (data, status, headers, config) {
                             if (data.Success) {
                                 //so we got the url lets put ngaudio in action
                                 $rootScope.audio = ngAudio.load(data.PreviewUrl);

                                 if ($rootScope.audio.error) {
                                     alert("Error loading sound");
                                 }
                                 else {
                                     $rootScope.activeTrack = attr.trackid;
                                     $rootScope.activePlayer = elem;
                                     elem.html(pauseText);

                                     $rootScope.audio.play();

                                 }
                             }
                         });
            });
        }
    };
}]);