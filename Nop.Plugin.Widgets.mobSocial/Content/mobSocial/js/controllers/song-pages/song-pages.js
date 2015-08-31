app.controller("ShareSongController", ['$scope', '$http', function ($scope, $http) {
    $scope.processing = false;
    $scope.shared = false;
    $scope.searchAPI = function (userInputString, timeoutPromise) {
        return $http.post('/MobSocial/SearchTermAutoComplete/', { term: userInputString }, { timeout: timeoutPromise });
    }
    $scope.receivers = [];
    $scope.customerSelected = function (callbackObject) {
        $scope.receivers.push(callbackObject.originalObject);
        $scope.$broadcast('angucomplete-alt:clearInput', 'customer-autocomplete');
    }

    $scope.remove = function (Id) {
        //remove the manager from the array
        for (var i = 0; i < $scope.receivers.length; i++) {
            var mgr = $scope.receivers[i];
            if (mgr.Id == Id) {
                $scope.receivers.splice(i, 1);
                break;
            }
        }
    }

    $scope.ShareSong = function (TrackId, RemoteTrackId) {
        $scope.processing = true;
        var data = {
            TrackId: TrackId,
            RemoteTrackId: RemoteTrackId,
            CustomerIds: [],
            Message :$scope.Message
        };
        for (var i = 0; i < $scope.receivers.length; i++) {
            data.CustomerIds.push($scope.receivers[i].Id);
        }
        $http({
            url: '/songs/ShareSong',
            method: "POST",
            data: data,
        }).success(function (data, status, headers, config) {
            if (data.Success) {
                $scope.shared = true;
            }
            else {
                $scope.shared = false;
                alert("Failed to share song");
            }
            data.processing = false;

        });
    }
}]);

app.controller("SongsPagesSharedSongController", ['$scope', '$http', function ($scope, $http) {
    $scope.ReceivedSongsPage = 1;
    $scope.ReceivedSongCount = 15;
    $scope.SharedSongsPage = 1;
    $scope.SharedSongCount = 15;

    $scope.GetReceivedSongs = function (Page, Count) {
        $http.post("/songs/GetReceivedSongs", { Page: Page, Count: Count })
                  .success(function (data, status, headers, config) {
                      $scope.ReceivedSongs = data.Songs;
                      $scope.TotalPages = data.TotalPages;
                      $scope.PageOptions = [];
                      for (var i = 1; i <= data.TotalPages; i++)
                          $scope.PageOptions.push(i);
                  });
    }
    
    $scope.$watchGroup(['ReceivedSongsPage', 'ReceivedSongCount'], function () {
        $scope.GetReceivedSongs($scope.ReceivedSongsPage, $scope.ReceivedSongCount);
    });

   
    $scope.GetSharedSongs = function (Page , Count) {
        $http.post("/songs/GetSharedSongs", { Page: Page, Count: Count })
                 .success(function (data, status, headers, config) {
                     $scope.SharedSongs = data.Songs;
                     $scope.TotalPages = data.TotalPages;
                     $scope.PageOptions = [];
                     for (var i = 1; i <= data.TotalPages; i++)
                         $scope.PageOptions.push(i);
                 });
    }
    $scope.GetSharedSongs($scope.SharedSongsPage, $scope.SharedSongCount);
}]);

app.controller("SongPageDisplayController", ['$scope', '$http', function ($scope, $http) {
    $scope.song = songModel;

    $scope.statuses = [
         { value: true, text: 'Yes' },
        { value: false, text: 'No' }
    ];

    $scope.UpdateSong = function (key, data) {
        var obj = "key=" + key + "&value=" + data + "&id=" + $scope.song.Id;
        var config = {
            url: "/songs/UpdateSongData/",
            method: 'POST',
            data: obj,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        $http(config).success(function (data, status, headers, config) { });
    }

    $scope.DeleteSong = function () {
        if (confirm("Are you sure you wish to delete this song page?")) {
            $http.post("/songs/DeleteSong", { SongId: $scope.song.Id })
                  .success(function (data, status, headers, config) {
                      if (data.Success) {
                          alert("Page deleted successfully.");
                          window.location.href = "/songs/SharedSongs";
                      }
                  });
        }
    }
    $scope.songsLoaded = false;
    $scope.SimilarSongs = [];
    $scope.GetSimilarSongs = function () {
        $http.post("/songs/GetSimilarSongs", { RemoteTrackId: $scope.song.RemoteEntityId, Count: 5 })
                .success(function (data, status, headers, config) {
                    $scope.SimilarSongs = data;
                    $scope.songsLoaded = true;
                });
    }
    $scope.GetSimilarSongs();

}]);

app.controller("SongPageEditorController", ['$scope', '$http', function ($scope, $http) {
    $scope.song = songModel;
    $scope.songFormValid = false;
    $scope.$watch('createSongForm.$valid', function (newVal) {
        $scope.songFormValid = newVal;
    });

    $scope.SaveSong = function () {
        if ($scope.songFormValid) {
            var song = {
                Name: $scope.song.Name,
                Description: $scope.song.Description,
                Price: $scope.song.Price,
                ArtistPageId: $scope.song.ArtistPageId
            };
            $http.post("/songs/SaveSong", song)
                   .success(function (data, status, headers, config) {
                       $scope.recordSaved = data.Success;
                       window.location.href = data.RedirectTo;
                   })
                   .error(function () {
                       alert("An error occured");
                   });
        }
        else {
            alert("Fields marked * are mandatory");
        }

    };
}]);