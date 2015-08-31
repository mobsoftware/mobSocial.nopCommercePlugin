app.factory('dialogService', function () {
    return {
        open: function (elementId, minWidth, dialogButtons) {
            $('#' + elementId).dialog({
                minWidth: minWidth,
                buttons: dialogButtons
            });
            $('#' + elementId).dialog('open');
        }
    };
});

