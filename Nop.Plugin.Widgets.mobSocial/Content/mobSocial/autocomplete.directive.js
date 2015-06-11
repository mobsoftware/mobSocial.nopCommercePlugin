
app
   .directive('autoComplete', function () {
       return {
           restrict: 'A',
           scope: {
               httpService: "=",
               renderItem: '=',
               renderItemUi: '=',
               ngModel: '=',
               minLength: '=',
               onSelect: '='
           },
           link: function ($scope, elem) {
               $(elem).autocomplete({
                   source: function (request, response) {
                       $scope.httpService(request.term).then(function (data) {
                           response(
                             $.map(data.data, function (item) {
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
               .data("ui-autocomplete")._renderItem = $scope.renderItemUi
               ;
           }
       };
   });


