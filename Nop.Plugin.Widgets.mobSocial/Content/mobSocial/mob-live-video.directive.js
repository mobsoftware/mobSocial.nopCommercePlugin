app
    .directive('mobLiveVideo', ['rootUrl', function (rootUrl) {
        return {
            restrict: 'E',
            scope: { customer: '=' },
            templateUrl: rootUrl + '/mob-live-video.template.html'
        }
    }]);