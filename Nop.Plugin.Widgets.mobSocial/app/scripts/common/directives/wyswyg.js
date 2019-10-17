window.mobSocial.directive('wyswyg', function () {
    return {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            jQuery(document)
                .ready(function () {
                    var id = jQuery(element).attr("id");
                    CKEDITOR.replace(id);
                    var instance = CKEDITOR.instances[id];
                    instance.setData(scope.ngModel);
                    var setFromInstanceChange = false;
                    
                    scope.$watch("ngModel",
                        function (newValue, oldValue) {
                            if (!setFromInstanceChange) {
                                //for some weird reasons, setdata doesn't work directly, so 
                                //for now we are just introducing some delay
                                setTimeout(function() {
                                    instance.setData(newValue);
                                    },
                                    300);
                            }
                        });

                    //capture on change event
                    instance.on('change', function () {
                        var data = instance.getData();
                        setFromInstanceChange = true;
                        scope.$apply(function () {
                            scope.ngModel = data;
                        });
                    });


                });
        }
    };
});