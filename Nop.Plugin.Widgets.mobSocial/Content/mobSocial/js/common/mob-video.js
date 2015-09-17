/// <reference path="common.js" />
window.skipRTCMultiConnectionLogs = false;

var connection = new RTCMultiConnection();

// Customize session
connection.session = { audio: true, video: true, oneway: true };


var streamId = 0;
var videoElement = null;

// on getting local or remote media stream
connection.onstream = function (e) {

    videoElement = e.mediaElement;
    $(videoElement).width(300).height(300);
    $('#profileVideoStream').html(videoElement);

    $(videoElement).unbind('pause').bind('pause', videoPaused);

    streamId = e.streamid;
    connection.streams[streamId].startRecording({ audio: true, video: true });


};

var sessions = {};
connection.onNewSession = function (session) {
    if (session[session.sessionId]) return;
    session[session.sessionId] = session;

    $('#viewBroadcast').unbind('click').click(function () {
        connection.join($('#broadcastName').val());
    });

};

var onMessageCallbacks = {};

var hub = $.connection.messagingHub;
$.support.cors = true;
$.connection.hub.url = '/signalr/hubs';
$.connection.hub.start();

hub.client.onMessageReceived = function (message) {
    var message = JSON.parse(message);
    if (onMessageCallbacks[message.channel]) {
        onMessageCallbacks[message.channel](message.message);
    }
};

connection.openSignalingChannel = function (config) {
    var channel = config.channel || this.channel;
    onMessageCallbacks[channel] = config.onmessage;

    if (config.onopen) setTimeout(config.onopen, 1000);
    return {
        send: function (message) {
            message = JSON.stringify({
                message: message,
                channel: channel
            });

            hub.server.send(message);
        }
    };
};

// setup signaling channel
connection.connect();


function videoPaused(e) {

    connection.streams[streamId].stopRecording(function (blobs) {
        var video = document.createElement('video');
        video.controls = true;
        video.src = URL.createObjectURL(blobs.video);
        video.play();
        $('body').append(video);

        var mediaElement = document.createElement('audio');
        mediaElement.src = URL.createObjectURL(blobs.audio);
        mediaElement.controls = true;
        $('body').append(mediaElement);


    });
}


app
    .controller('mobBroadcastController', ['$rootScope', '$scope', '$http', '$attrs',
        function ($rootScope, $scope, $http, $attrs) {

            $scope.canViewBroadcast = $scope.$parent.customerProfile.IsFriend;

            $scope.startBroadcast = function () {
                if (streamId == 0) {
                    connection.open($('#broadcastName').val());
                }
            };

            
        }


    ]);





$(function () {


    $('#joinRoomButton').unbind('click').click(function () {
        console.log('connecting to room ' + $('#roomName').val());
        connection.join($('#roomName').val())
    });



});