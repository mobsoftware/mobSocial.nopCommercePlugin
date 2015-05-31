
app
   .directive('autoComplete', function () {
       return {
           restrict: 'A',
           scope: {
               httpService: "=",
               renderItem: '=',
               ngModel: '=',
               minLength: '=',
               onSelect: '='
           },
           link: function ($scope, elem) {
               $(elem).autocomplete({
                   source: function (request, response) {
                       $scope.httpService(request.term).then(function (data) {
                           response(
                             $.map(data.items, function (item) {
                                 return $scope.renderItem(item);
                             }
                             )
                           );
                       });
                   },
                   minLength: $scope.minLength,
                   select: function (event, ui) {
                       if ($scope.onSelect) {
                           $scope.onSelect(ui.item.item);
                       }

                       $scope.ngModel = ui.item.item;

                   }
               })
               ;
           }
       };
   });


