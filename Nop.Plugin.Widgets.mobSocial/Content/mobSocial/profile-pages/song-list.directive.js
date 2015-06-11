app
    .directive('songList',
	['rootUrl', '$http',
	function (rootUrl, $http) {
	    return {
	        restrict: 'E',
	        scope:
            {
                customer: '=',
                songListName: '@',
                ngModel: '='
            },
	        link: function ($scope, element, attrs) {

	            $scope.SaveSong = function (item) {
	                var url = './CustomerProfile/AddFavoriteSong';

	                var favoriteSong = {
	                    CustomerId: $scope.customer.CustomerId,
	                    TrackId: $scope.ngModel.id,
	                    Title: $scope.ngModel.title,
	                    RemoteArtistId: $scope.ngModel.artist_id,
	                    ArtistName: $scope.ngModel.artist_name,
	                    PreviewUrl: 
	                    };

	                var url = './CustomerProfile/AddFavoriteSong';
	                $http.post(url, favoriteSong);

	                //profileService.AddFavoriteSong(favoriteSong);
	            };

	            $scope.openAddFavoriteSongDialog = function () {
	                $('#addFavoriteSongDialog').dialog({

	                    buttons: {
	                        'Add': function () {


	                            $scope.SaveSong($scope.ngModel);

	                            $(this).dialog("close");

	                        },
	                        Cancel: function () {
	                            $(this).dialog("close");
	                        }
	                    }
	                });
	            }
	        },
	        templateUrl: rootUrl + '/song-list.template.html'
	    }
	}]);