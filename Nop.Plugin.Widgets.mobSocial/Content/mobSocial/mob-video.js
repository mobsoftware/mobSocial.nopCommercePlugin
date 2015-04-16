/// <reference path="common.js" />
window.skipRTCMultiConnectionLogs = false;

var connection = new RTCMultiConnection();

// Customize session
connection.session = { audio: true, video: true, oneway: true };

// on getting local or remote media stream
connection.onstream = function (e) {
    $(e.mediaElement).width(300).height(300);
    $('#profileVideoStream').html(e.mediaElement);
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


$(function () {

    $('#profileVideoStream').unbind('click').click(function () {
        connection.open($('#broadcastName').val());
    });


    $('#joinRoomButton').unbind('click').click(function () {
        console.log('connecting to room ' + $('#roomName').val());
        connection.join($('#roomName').val())
    });

});