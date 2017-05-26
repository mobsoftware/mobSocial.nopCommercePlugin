app.factory('conversationHub', ['$q', 'Hub', '$rootScope', 'signalREndPoint', 'conversationService', 'WebClientService', 'globalApiEndPoint', '$timeout', function ($q, Hub, $rootScope, signalREndPoint, conversationService, webClientService, globalApiEndPoint, $timeout) {
    //chat/conversation configurations
    var scrollToBottom = function () {
        $timeout(function () {
            var scrollHeight = angular.element(".chat-scroll .conversation")[0].scrollHeight;
            angular.element(".chat-scroll .conversation").animate({ scrollTop: scrollHeight });
        },
            0);
    }
    $rootScope.attachReadScroller = function () {
        //marking conversation read when scrolled to bottom
        jQuery(".chat-scroll .conversation")
            .on("scroll", function () {
                var elem = angular.element(this)[0];
                var scrollTop = elem.scrollTop;
                var scrollHeight = elem.scrollHeight;
                var offsetHeight = elem.offsetHeight;
                if (scrollHeight - scrollTop == offsetHeight) {
                    //we are at bottom so we can mark active conversation as read
                    if ($rootScope.Chat.activeChat.unreadCount > 0) {
                        $rootScope.Chat.markConversationRead($rootScope.Chat.activeChat.conversation.ConversationId);
                    }
                }
            });
    }

    var markChatOpen = function (userId) {
        var opened = false;
        var cu = $rootScope.CurrentUser;

        for (var i = 0; i < $rootScope.Chat.openChats.length; i++) {
            var conversation = $rootScope.Chat.openChats[i].conversation;
            var conversationDetails = $rootScope.Chat.openChats[i].conversationDetails;
            var canOpen = conversation.ReceiverId == userId && conversation.ReceiverType == "User" && conversationDetails;
            if (canOpen) {
                $rootScope.Chat.activeChat = $rootScope.Chat.openChats[i];
                $rootScope.Chat.activeChat.toUserId = userId;
                opened = true;
                scrollToBottom();
                break;
            }
        }
        return opened;
    }

    var hub = new Hub('conversation',
    {
        rootPath: signalREndPoint,
        listeners: {
            'conversationReply': function (reply, conversationId) {
                $timeout(function () {
                    var chat = $rootScope.Chat.getChat(reply.UserId, conversationId);
                    if (chat) {
                        chat.conversationDetails.ConversationReplies.push(reply);
                        chat.unreadCount = chat.unreadCount || 0;
                        if (reply.UserId != $rootScope.CurrentUser.Id)
                            chat.unreadCount++;
                        chat.activeTypingUserId = 0;
                    } else {
                        $rootScope.Chat.globalUnreadCount++;
                    }
                    $rootScope.$apply();
                    scrollToBottom();
                }, 0);
            },
            'notifyTyping': function (conversationId, userId, typing) {
                var chat = $rootScope.Chat.activeChat;
                if (chat && chat.conversation.ConversationId == conversationId) {
                    $timeout(function () {
                        chat.activeTypingUserId = typing ? userId : 0;
                        $rootScope.$apply();
                        scrollToBottom();
                    }, 0);
                }
            },
            'markRead': function (conversationId) {
                var chat = $rootScope.Chat.getChat(0, conversationId);
                console.log("marking ", chat);
                if (chat) {
                    $timeout(function () {
                        for (var i = 0; i < chat.conversationDetails.ConversationReplies.length; i++) {
                            chat.conversationDetails.ConversationReplies[i].ReplyStatus = 3; //read
                        }
                        $rootScope.$apply();
                    }, 0);
                }
            }
        },
        methods: ['postReply', 'markRead', 'notifyTyping']
    });

    $rootScope.Chat = {
        openChats: [],
        activeChat: null,
        globalUnreadCount: 0,
        firstLoadComplete: false,
        getTotalUnreadCount: function () {
            return $rootScope.Chat.openChats.reduce(function (total, chat) {
                return total + (chat.unreadCount || 0);
            }, 0);
        },
        isOpen: function () {
            return $rootScope.Chat.activeChat != null;
        },
        isActiveChat: function (userId) {
            if (!$rootScope.Chat.activeChat)
                return false;
            var chat = $rootScope.Chat.activeChat.conversationDetails;
            if (!chat)
                return false;
            var canOpen = (chat.ReceiverId == userId || chat.UserId == userId) && chat.ReceiverType == "User";
            return canOpen;
        },
        getChat: function (userId, conversationId) {
            var cu = $rootScope.CurrentUser;
            for (var i = 0; i < $rootScope.Chat.openChats.length; i++) {
                var chat = $rootScope.Chat.openChats[i].conversation;
                var canOpen = chat.ReceiverId == userId && chat.UserId == cu.Id && chat.ReceiverType == "User";

                if (canOpen) {
                    return $rootScope.Chat.openChats[i];
                } else {
                    if (chat.ConversationId == conversationId)
                        return $rootScope.Chat.openChats[i];
                }
            }
            return null;
        },
        loadChat: function (userId, page, callback) {
            conversationService.get(userId, page,
                    function (response) {
                        if (response.Success) {
                            var chat = $rootScope.Chat.getChat(userId);
                            if (chat.conversation.ConversationId == 0) {
                                if (response.ResponseData.Conversation) {
                                    chat.conversationDetails = response.ResponseData.Conversation;
                                    chat.loadedPage = page;
                                    scrollToBottom();
                                }
                            }
                            else {
                                if (page == 1)
                                    chat.conversationDetails = response.ResponseData.Conversation;
                                else
                                {
                                    var replies = response.ResponseData.Conversation.ConversationReplies;
                                    chat.conversationDetails.ConversationReplies = chat.conversationDetails.ConversationReplies || [];
                                    for (var i = replies.length; i >= 0; i--)
                                        chat.conversationDetails.ConversationReplies.unshift(replies[i]);
                                }
                                
                            }
                            markChatOpen(userId);

                        }
                    });
        },
        chatWith: function (userId, callback) {
            if (!markChatOpen(userId)) {
                this.loadChat(userId, 1, callback);
            } else {
                if (callback)
                    callback();
                scrollToBottom();
            }
        },
        sendReply: function () {
            hub.postReply($rootScope.Chat.activeChat.toUserId, $rootScope.Chat.activeChat.replyText);
            $timeout(function () {
                $rootScope.Chat.activeChat.replyText = "";
                $rootScope.$apply();
            },
                0);

        },
        //get online friends
        loadOnlineFriends: function (currentUserId) {
            $rootScope.CurrentUser = {
                Id: currentUserId
            };
            if (this.firstLoadComplete)
                return;
            conversationService.getAll(function (response) {
                if (response.Success) {
                    $rootScope.Chat.firstLoadComplete = true;
                    var conversations = response.ResponseData.Conversations;
                    for (var i = 0; i < conversations.length; i++) {
                        var conversation = conversations[i];
                        conversation.ReceiverType = "User";
                        conversation.UserId = $rootScope.CurrentUser.Id;
                        conversation.ConversationReplies = [];
                        $rootScope.Chat.openChats.push({
                            conversation: conversation,
                            conversationDetails: null,
                            replyText: '',
                            loadedPage: 0,
                            unreadCount: conversation.UnreadCount
                        });
                    }

                }
            });
        },
        markConversationRead: function (conversationId) {
            hub.markRead(conversationId);
            var chat = $rootScope.Chat.getChat(0, conversationId);
            if (chat) {
                chat.unreadCount = 0;
            }
        }
    };

    $rootScope.$watch("Chat.activeChat.replyText",
        function (newValue, oldValue) {
            var activeChat = $rootScope.Chat.activeChat;
            if (!activeChat) {
                return;
            }
            if (newValue == oldValue || newValue == "" || oldValue == undefined) {
                return;
            }

            //some change has been done, we'll notify it or not depends on our previous notification
            var now = new Date();
            var nowSeconds = Math.round(now.getTime() / 1000);
            var prevSeconds = activeChat.lastNotificationSeconds || 0;

            var delay = nowSeconds - prevSeconds;
            //we'll send notification only after 2 seconds wait
            if (delay > 10) {
                //notify typing
                hub.notifyTyping(activeChat.conversation.ConversationId, true);
                activeChat.lastNotificationSeconds = nowSeconds;
                return;
            }
        });

    return this;
}]);