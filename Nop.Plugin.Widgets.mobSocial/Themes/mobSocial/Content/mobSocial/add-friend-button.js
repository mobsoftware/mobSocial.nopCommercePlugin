/// <reference path="common.js" />


$(document).ready(function () {


    var showConfirmButton = $("div[data-showConfirmButton='true']");

    showConfirmButton.each(function () {
        showConfirmButton.find('.confirm-friend-button').show();
        showConfirmButton.find('.confirmed-friend-button, .confirmed-friend-button-icon').hide();
    });


    /*if (showConfirmButton.length > 0) {
        showConfirmButton.find('#confirm-friend-button').show();
        showConfirmButton.find('#confirmed-friend-button').hide();
    } else {
        showConfirmButton.find('#confirm-friend-button').hide();
        showConfirmButton.find('#confirmed-friend-button').show();
    }*/
    
    

    $('.add-friend-button').one('click', function () {
        
        var params = {
            toCustomerId: $(this).attr('data-toCustomerId')
        };



        $.get(Website.RootUrl + '/MobSocial/AddFriend', params, function(result) {

            if (result.redirect) {
                document.location.href = result.redirect;
                return;
            }

            $('#add-friend-button-container').hide();
            $('#friend-request-sent-container').removeClass('hide');
            $('#friend-request-sent-container').addClass('show');

            
        });
        

    });
    

    $('.confirm-friend-button').one('click', function () {

        var confirmFriendButton = $(this);
        
        var params = {
            friendCustomerId: confirmFriendButton.attr('data-friendCustomerId')
        };

        $.get(Website.RootUrl = '/MobSocial/ConfirmFriend', params, function (result) {

            if (result.redirect) {
                document.location.href = result.redirect;
                return;
            }
            
            confirmFriendButton.hide();
            confirmFriendButton.siblings('.confirmed-friend-button, .confirmed-friend-button-icon').show();
            

        });


    });

    



    
});