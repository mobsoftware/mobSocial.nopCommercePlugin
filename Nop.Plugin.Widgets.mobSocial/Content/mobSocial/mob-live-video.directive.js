app
    .directive('mobLiveVideo', ['rootUrl', function (rootUrl) {
        return {
            restrict: 'E',
            customer: '=customer',
            templateUrl: rootUrl + '/mob-live-video.html'
        }
    }]);