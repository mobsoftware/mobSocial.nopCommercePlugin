
app
    .directive('autoComplete', ['autoCompleteDataService', function (autoCompleteDataService) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {
                $(element).autocomplete({
                    source: autoCompleteDataService.getSource,
                    minLength: 3
                });
            }
        }
    }]);