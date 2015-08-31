app.directive("mobPreviewSongButton", ['$http', '$rootScope', 'ngAudio', 'ngAudioGlobals', function ($http, $rootScope, ngAudio, ngAudioGlobals) {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, elem, attr) {
            ngAudioGlobals.unlock = false;
            elem.bind("click", function () {
                var playText = "Play";
                var pauseText = "Pause";

                //first check if its a pause action
                if ($rootScope.audio) {
                    if ($rootScope.activeTrack == attr.trackid) {
                        if ($rootScope.audio.paused) {
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

                var previewUrl = "";

                if (attr.previewurl) {
                   
                    previewUrl = attr.previewurl;
                    //so we got the url lets put ngaudio in action
                    $rootScope.audio = ngAudio.load(previewUrl);
                    
                    if (!$rootScope.audio || $rootScope.audio.error) {
                        alert("Error loading sound");
                    }
                    else {
                        $rootScope.activeTrack = attr.trackid;
                        $rootScope.activePlayer = elem;
                        elem.html(pauseText);
                        $rootScope.audio.play();

                    }
                }
                else {
                    //first lets go to our server to get the preview url
                    $http.post("/songs/GetSongPreviewUrl", { TrackId: attr.trackid, SongId: attr.SongId })
                             .success(function (data, status, headers, config) {

                                 if (data.Success) {
                                     previewUrl = data.PreviewUrl;
                                     //so we got the url lets put ngaudio in action
                                     $rootScope.audio = ngAudio.load(previewUrl);

                                     if (!$rootScope.audio || $rootScope.audio.error) {
                                         alert("Error loading sound");
                                     }
                                     else {
                                         $rootScope.activeTrack = attr.trackid;
                                         $rootScope.activePlayer = elem;
                                         elem.html(pauseText);

                                         $rootScope.audio.play();

                                     }
                                 }
                                 else {
                                     alert("Can't play the song");
                                 }
                             });
                }


            });
        }
    };
}]);