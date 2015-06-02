app.controller("ArtistPageController", ['$scope', '$http', function ($scope, $http) {
    $scope.artist = {};
    $scope.nameAvailable = false;
    $scope.$watch('createArtistForm.$valid', function (newVal) {
        $scope.artistFormValid = newVal;
    });
    $scope.recordSaved = false;
    $scope.IsArtistNameAvailable = function () {
        if ($scope.artistFormValid) {
            $http.post("/artists/CheckArtistNameAvailable", { name: $scope.artist.Name })
                   .success(function (data, status, headers, config) {
                       if (data.available && data.remoteArtist) {
                           $scope.artist = JSON.parse(data.artist);
                       }
                       $scope.artist.nameAvailable = data.available;

                   });
        }

    };

    $scope.SaveArtist = function () {
        if ($scope.artistFormValid && $scope.artist.nameAvailable) {
            $http.post("/artists/SaveArtist", $scope.artist)
                   .success(function (data, status, headers, config) {
                       $scope.recordSaved = data.Success;
                       if (data.PageUrl)
                           $scope.newPageUrl = data.PageUrl;
                   })
                   .error(function () {
                       alert("An error occured");
                   });
        }
       
    };
}]);

app.controller("ArtistPageDisplayController", ['$scope', '$http', function ($scope, $http) {
    $scope.artist = artistModel;
    $scope.relatedArtists = {};

    $http.post("/artists/GetRelatedArtists", { ArtistId: $scope.artist.Id })
                  .success(function (data, status, headers, config) {
                      $scope.relatedArtists = data;
                      $scope.relatedArtistsLoaded = true;
                  });

    $scope.UpdateArtist = function (key, data) {
        var obj = "key=" + key + "&value=" + data + "&id=" + $scope.artist.Id;
        var config = {
            url: "/artists/UpdateArtistData/",
            method: 'POST',
            data: obj,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        $http(config).success(function (data, status, headers, config) { });
    }

    $scope.DeleteArtist = function () {
        if (confirm("Are you sure you wish to delete this artist page?")) {
            $http.post("/artists/DeleteArtistPage", { ArtistId: $scope.artist.Id })
                  .success(function (data, status, headers, config) {
                      if (data.Success) {
                          alert("Page deleted successfully.");
                          window.location.href = "/artists/MyArtistPages";
                      }
                  });
        }
    }

    $scope.GetManagers = function () {
        $http.post("/artists/GetPageManagers", { ArtistPageId: $scope.artist.Id })
                 .success(function (data, status, headers, config) {
                     $scope.managers = data;
                     $scope.managersLoaded = true;
                 });
    };
    $scope.GetManagers();

    $scope.GetEligibleManagers = function () {
        $http.post("/artists/GetEligibleManagers", {ArtistPageId: $scope.artist.Id})
                 .success(function (data, status, headers, config) {
                     $scope.eligibleManagers = data;
                 });
    }
    
    $scope.newPageManager = null;
    $scope.AddPageManager = function () {
        if ($scope.newPageManager == null)
            return;
        $http.post("/artists/SavePageManager", {ArtistPageId: $scope.artist.Id, CustomerId : $scope.newPageManager.originalObject.Id})
                .success(function (data, status, headers, config) {
                    if (data.Success) {
                        var newMgr = $scope.newPageManager.originalObject;
                        $scope.managers.push({
                            CustomerDisplayName: newMgr.CustomerDisplayName,
                            ProfileUrl: newMgr.ProfileUrl,
                            ProfileImageUrl: newMgr.ProfileImageUrl,
                            Id: newMgr.Id
                        });
                    }
                    else {
                        if (data.Message == "AlreadyPageManager")
                            alert($scope.newPageManager.originalObject.CustomerDisplayName + " is already a page manager");
                        else if (data.Message == "Unauthorized")
                            alert("Unauthorized operation");
                        else if (data.Message == "CustomerDoesNotExist")
                            alert("Customer doesn't exist");

                    }
                    $scope.newPageManager = null;
                    $scope.$broadcast('angucomplete-alt:clearInput', 'friend-autocomplete');
                });
    }
    $scope.DeletePageManager = function (CustomerId) {
        if (confirm("Are you sure you wish to remove this page manager?")) {
            $http.post("/artists/DeletePageManager", { ArtistPageId: $scope.artist.Id, CustomerId: CustomerId })
               .success(function (data, status, headers, config) {
                   if (data.Success) {
                       //remove the manager from the array
                       for (var i = 0; i < $scope.managers.length; i++) {
                           var mgr = $scope.managers[i];
                           if(mgr.Id == CustomerId)
                           {
                               $scope.managers.splice(i, 1);
                               break;
                           }
                       }
                   }
               });
        }
       
    }

}]);

app.controller("ArtistPageSongsController", ['$scope', '$http', 'ngAudio',  function ($scope, $http, ngAudio) {
    $scope.artist = artistModel;
    $scope.GetArtistSongs = function () {
        $http.post("/artists/GetArtistSongs", { ArtistName:$scope.artist.Name })
                  .success(function (data, status, headers, config) {
                      $scope.songs = data;
                      $scope.songsLoaded = true;
        });
    }
    $scope.GetArtistSongs();

    $scope.activeTrack = null;

    $scope.PlayPause = function (TrackId) {
        //first check if its a pause action
        if ($scope.audio) {

            if ($scope.activeTrack == TrackId) {
                if ($scope.audio.paused)
                    $scope.audio.play();
                else
                    $scope.audio.pause();

                return;
            }
            $scope.audio.pause();//pause any active track
            $scope.activeTrack = null;
        }
        //first lets go to our server to get the preview url
        $http.post("/artists/GetArtistSongPreviewUrl", { TrackId: TrackId })
                 .success(function (data, status, headers, config) {
                     if (data.Success) {
                         //so we got the url lets put ngaudio in action
                         $scope.audio = ngAudio.load(data.PreviewUrl);
                         
                         if ($scope.audio.error) {
                             alert("Error loading sound");
                         }
                         else {
                             $scope.activeTrack = TrackId;
                             $scope.audio.play();

                         }
                     }
       });
    }
   
}]);


app.controller("ArtistPagesMyPagesController", ['$scope', '$http', function ($scope, $http) {
    $scope.Page = 1;
    $scope.Count = 15;
    $scope.Search = "";
    
    $scope.GetArtistPages = function (Page, Count, Search) {
        $http.post("/artists/MyArtistPages", { Page: Page, Count : Count, Search: Search })
                  .success(function (data, status, headers, config) {
                      $scope.Artists = data.Artists;
                      $scope.TotalPages = data.TotalPages;
                      $scope.PageOptions = [];
                      for (var i = 1; i <= data.TotalPages; i++)
                          $scope.PageOptions.push(i);
                  });
    }
    $scope.GetArtistPages($scope.Page, $scope.Count, $scope.Search);

    $scope.$watch('Search', function (newValue, oldValue) {
        if (newValue !== oldValue)
            $scope.Page = 1;
    });
    $scope.$watchGroup(['Search', 'Page', 'Count'], function () {
        $scope.GetArtistPages($scope.Page, $scope.Count, $scope.Search);
    });     

    $scope.DeleteArtist = function (ArtistPageId) {
        if (confirm("Are you sure you wish to delete this artist page?")) {
            $http.post("/artists/DeleteArtistPage", { ArtistPageId: ArtistPageId })
                  .success(function (data, status, headers, config) {
                      if (data.Success) {
                          alert("Page deleted successfully.");
                          window.location.reload();
                      }
                  });
        }
        return false;
    }

    $scope.GetPagesAsManager = function () {
        $http.post("/artists/GetPagesAsManager")
                 .success(function (data, status, headers, config) {
                     $scope.AsManagerArtists = data.Artists;                    
        });
    }
    $scope.GetPagesAsManager();

}]);