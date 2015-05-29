app
    .directive('songList', ['rootUrl', function (rootUrl) {
        return {
            restrict: 'E',
            scope:
            {
                customer: '=',
                songListName: '@'
            },
            link: function ($scope, element, attrs) {
                $scope.openAddFavoriteSongDialog = function () {
                    $('#addFavoriteSongDialog').dialog({
                        buttons: {
                            'Add': function () {
                                alert($scope.customer.id);
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