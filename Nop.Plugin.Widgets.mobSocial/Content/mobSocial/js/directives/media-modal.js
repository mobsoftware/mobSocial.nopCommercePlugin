app.directive("mediaModal", ["mediaService", "$rootScope", "$timeout" , function (mediaService, $rootScope, $timeout) {
    return {
        restrict: "E",
        templateUrl: "/pages/components/mediaModal.html",
        replace: true,
        scope: false,
        link: function(scope, elem, attr) {
            scope.prevMedia = function() {
                scope.reloadMedia(scope.media.PreviousMediaId);
            }

            scope.nextMedia = function() {
                scope.reloadMedia(scope.media.NextMediaId);
            }

            scope.reloadMedia = function(id) {
                mediaService.get(id,
                       function (response) {
                           if (response.Success) {
                               $timeout(function() {
                                   scope.media = response.ResponseData.Media;
                                   if(scope.media.MediaType == 1 && scope.$API)//video
                                       $rootScope.updatedVideoSource(scope.$API, scope.media.Url, scope.media.MimeType);
                                   },
                                   0);

                           }
                           
                       },
                       function (response) {

                       });
            }

            scope.videoPlayerReady = function ($API) {
                scope.$API = $API;
                $rootScope.updatedVideoSource(scope.$API, scope.media.Url, scope.media.MimeType);
            }

        }
    }
}]);