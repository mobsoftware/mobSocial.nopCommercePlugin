/// <reference path="common.js" />
var mobSocialDialog = null;
var confirmDialog = null;
var currentPictureId = null;
var okDialog = null;


function AjaxError(jqXhr, textStatus, errorThrown)
{
    if (jqXhr.responseText != null)
        alert($.parseJSON(jqXhr.responseText).message);
    else
        alert('An error has occured while uploading the album picture.');

    mobSocialDialog.dialog("close");
}

function SubmitSuccesful(responseText, statusText) {

    var newAlbumPicture = responseText;

    var firstPictureBlock = $('.customer-album-picture-block:first');

    var newPictureBlock = firstPictureBlock.clone();
    var newThumbImageTag = newPictureBlock.find('img');

    newThumbImageTag.src = newAlbumPicture.ThumbnailUrl;

    newPictureBlock.attr('data-customerAlbumPictureId', newAlbumPicture.Id);

    var newDeletePictureButton = newPictureBlock.find('.delete-picture-button');
    newDeletePictureButton.attr('data-customerAlbumPictureId', newAlbumPicture.Id);


    $(document).insertBefore(newPictureBlock,firstPictureBlock);

    mobSocialDialog.dialog("close");
}




$(document).ready(function () {

    /*todo:make these ok and confirm dialogs global to mobSocial and reusable to reduce code and development time.*/
    mobSocialDialog = $('.add-video-dialog').dialog({
        autoOpen: false,
        modal: true,
        width: 500,
        buttons: {
            "Add Video": function() {

                $('#addVideoForm').ajaxForm({
                    success: SubmitSuccesful,
                    error: AjaxError
                }).submit();


            },
            "Cancel": function() {

                $(this).dialog("close");


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
                
                var postData = { customerVideoId: currentVideoId };
                $.ajax({
                    type: 'Post',
                    url: Website.RootUrl + '/mobSocial/DeleteCustomerVideo',
                    data: postData,
                    success: function (data) {
                        var container = $('.customer-video-block[data-customerVideoId="' + currentVideoId + '"]');
                        container.remove();

                        confirmDialog.dialog("close");
                    },
                    error: function (request, status, error) {
                        alert('An error occured while deleting the video.');
                    }
                });
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });


    $('.add-video-button').click(function () {
        $('.add-video-dialog').dialog('open');

        mobSocialDialog.data("uiDialog")._title = function (title) {
            title.html(this.options.title);
        };
    });


    $('.customer-video-like-button:not(.disabled)').click(function() {

        var container = $(this).closest('.customer-video-block');
        var currentId = container.attr('data-customerVideoId');

        var currentElement = $(this);

        var postData = {
            customerVideoId: currentId
        };


        $.ajax({
            type: 'Post',
            url: Website.RootUrl + '/mobSocial/AddVideoLike',
            data: postData,
            success: function (result) {
                
                if (result.redirect) {
                    document.location.href = result.redirect;
                    return;
                }

                currentElement.find('.text').text(' Liked');
                currentElement.unbind('click');
                currentElement.addClass('disabled');

                var likeCountElement = container.find('.customer-video-likecount');
                var likeCount = likeCountElement.attr('data-likeCount');
                
                likeCountElement.attr('data-likeCount', likeCount++);
                likeCountElement.text(likeCount);


            },
            error: function(request, status, error) {
                alert('An error occured while liking this video.');
            }
        });
    });


    $('.delete-video-button').click(function() {

        currentVideoId = $(this).attr('data-customerVideoId');

        confirmDialog.dialog('open');


    });


    




});