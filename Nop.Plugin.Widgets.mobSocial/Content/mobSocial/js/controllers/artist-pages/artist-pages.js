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
                       if (data.RedirectTo)
                           window.location.href = data.RedirectTo;
                   })
                   .error(function () {
                       alert("An error occured");
                   });
        }
        else {
            if (!$scope.artistFormValid)
                alert("Fields marked * are mandatory");
            else
                alert("The artist name you are trying to create is not available");
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
    if ($scope.artist.CanDelete)
        $scope.GetManagers();

    $scope.GetEligibleManagers = function () {
        $http.post("/artists/GetEligibleManagers", { ArtistPageId: $scope.artist.Id })
                 .success(function (data, status, headers, config) {
                     $scope.eligibleManagers = data;
                 });
    }
    
    $scope.newPageManager = null;
    $scope.AddPageManager = function () {
        if ($scope.newPageManager == null)
            return;
        $http.post("/artists/SavePageManager", { ArtistPageId: $scope.artist.Id, CustomerId: $scope.newPageManager.originalObject.Id })
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
                           if (mgr.Id == CustomerId) {
                               $scope.managers.splice(i, 1);
                               break;
                           }
                       }
                   }
               });
        }
       
    }
    $scope.PurchasedSongsPage = 1;
    $scope.PurchasedSongsCount = 15;
    $scope.GetPurchasedSongs = function () {
        $http.post("/artists/GetPurchasedSongs", { ArtistPageId: $scope.artist.Id, Page: $scope.PurchasedSongsPage, Count: $scope.PurchasedSongsCount })
                .success(function (data, status, headers, config) {
                    $scope.PurchasedSongs = data.Songs;
                    $scope.PurchasedSongsLoaded = true;

                    $scope.TotalPages = data.TotalPages;
                    $scope.TotalSales = data.TotalSales;
                    $scope.TotalSellPrice = data.TotalSellPrice;
                    $scope.TotalNetPrice = data.TotalNetPrice;
                    $scope.TotalFeeAmount = data.TotalFeeAmount;

                    $scope.PageOptions = [];
                    for (var i = 1; i <= data.TotalPages; i++)
                        $scope.PageOptions.push(i);

                });
    }
    if ($scope.artist.CanDelete)
        $scope.GetPurchasedSongs();


    $scope.PaymentTypes = [
        { value: '1', text: 'Paypal' },
        { value: '2', text: 'Bank Account' },
        { value: '3', text: 'Send Check' },
    ];
    $scope.GetPaymentMethod = function () {
        $http.post("/artists/GetPaymentMethod", { ArtistPageId: $scope.artist.Id })
              .success(function (data, status, headers, config) {
                  $scope.PaymentMethod = data.PaymentMethod;
              });
    }
    if ($scope.artist.CanDelete)
        $scope.GetPaymentMethod();


    $scope.SavePaymentMethod = function () {
        $http.post("/artists/SavePaymentMethod", $scope.PaymentMethod)
             .success(function (data, status, headers, config) {
                 $scope.PaymentMethodSaved = data.Success;
                 if (!data.Success) {
                     alert("Failed to save payment method");
                 }
             });
    }


}]);

app.controller("ArtistPageSongsController", ['$scope', '$http', 'ngAudio', function ($scope, $http, ngAudio) {
    $scope.artist = artistModel;
    var params = null;
    var url = "";

    if ($scope.artist.RemoteEntityId == null) {
        url = "/artists/GetArtistSongsByArtistPage";
        params = {
            ArtistPageId: $scope.artist.Id
        };
    }
    else {
        url = "/artists/GetArtistSongs";
        params = {
            ArtistName: $scope.artist.Name
        };
    }
    $scope.GetArtistSongs = function () {
        $http.post(url, params)
                  .success(function (data, status, headers, config) {
                      $scope.songs = data;
                      $scope.songsLoaded = true;
        });
    }
    $scope.GetArtistSongs();
   
    $scope.GotoSongEditor = function () {
        window.location.href = "/songs/SongEditor/" + $scope.artist.Id;
    }
}]);


app.controller("ArtistPagesMyPagesController", ['$scope', '$http', function ($scope, $http) {
    $scope.Page = 1;
    $scope.Count = 15;
    $scope.Search = "";
    
    $scope.GetArtistPages = function (Page, Count, Search) {
        $http.post("/artists/MyArtistPages", { Page: Page, Count: Count, Search: Search })
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