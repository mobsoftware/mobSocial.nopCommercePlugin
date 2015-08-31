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
	                    CustomerId: 1,
	                    TrackId: 1,
	                    Title: null,
	                    ArtistId: 1,
	                    ArtistName: 'testartistname',
	                    PreviewUrl: 'http://test'
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