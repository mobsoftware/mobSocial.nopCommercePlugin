/// <reference path="common.js" />
var mobSocialDialog = null;
var confirmDialog = null;
var currentPictureId = null;
var okDialog = null;




$(document).ready(function () {

    /*todo:make these ok and confirm dialogs global to mobSocial and reusable to reduce code and development time.*/
    mobSocialDialog = $('#dialog-modal').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                $('#uploadPictureForm').submit();
                $('#dialog-modal').dialog("close");
            }
        }
    });

    okDialog = $('#dialog-ok').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                okDialog.dialog("close");
            }
        }
    });

    confirmDialog = $('#dialog-confirm').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Confirm": function () {
                var postData = { customerAlbumPictureId: currentPictureId };
                $.ajax({
                    type: 'Post',
                    url: Website.RootUrl + '/mobSocial/DeleteCustomerAlbumPicture',
                    data: postData,
                    success: function (data) {
                        var pictureDeleted = $('.customer-album-picture-block[data-customerAlbumPictureId="' + currentPictureId + '"]');
                        pictureDeleted.remove();
                        confirmDialog.dialog("close");

                    },
                    error: function (request, status, error) {
                        okDialog.dialog('option', 'title', 'Upload Picture');
                        okDialog.html(request.responseText);
                    }
                });
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });


    $('.add-picture-button').click(function () {
        $('#dialog-modal').dialog('open');

        mobSocialDialog.data("uiDialog")._title = function (title) {
            title.html(this.options.title);
        };
    });


    $('.delete-picture-button').click(function () {

        currentPictureId = $(this).attr('data-customerAlbumPictureId');
        confirmDialog.dialog('open');


    });




    function AjaxError(jqXhr, textStatus, errorThrown) {
        alert($.parseJSON(jqXhr.responseText).message);
        mobSocialDialog.dialog("close");
    }

    function SubmitSuccesful(responseText, statusText) {
        mobSocialDialog.dialog("close");
        // TODO: later the picture needs to be added without reloading the page by returning the path to the new picture.
        location.reload();
    }





});