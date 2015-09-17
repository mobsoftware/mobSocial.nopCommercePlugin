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
	                    TrackId: item.TrackId,
	                    Title: item.Name,
	                    PreviewUrl: item.PreviewUrl
	                };

	                var url = './CustomerProfile/AddFavoriteSong';
	                $http.post(url, favoriteSong);

	                //profileService.AddFavoriteSong(favoriteSong);
	            };

	            $scope.DeleteSong = function (song) {

	                var url = './CustomerProfile/DeleteFavoriteSong';
	                var data = { id: song.Id };

	                $http.post(url, data)
			        .success(function (data, status, headers, config) {
			            var index = $scope.customer.FavoriteSongs.indexOf(song);
			            $scope.customer.FavoriteSongs.splice(index, 1);
			        })
                    .error(function (data, status, headers, config) {
                        alert('An error occured deleting song.');
                    });
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