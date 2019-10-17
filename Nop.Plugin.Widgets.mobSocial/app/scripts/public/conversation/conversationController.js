window.mobSocial.controller("conversationController",
[
    "$scope", "conversationService", "conversationHub", function($scope, conversationService, conversationHub) {
        $scope.openChats = [];

        var markChatOpen = function (userId) {
            var opened = false;
            for (var i = 0; i < $scope.openChats.length; i++) {
                if ($scope.openChats[i].userId == userId) {
                    $scope.openChats[i].open = true;
                    opened = true;
                } else {
                    $scope.openChats[i].open = false;
                }
            }
            return opened;
        }

        $scope.chatWith = function (userId) {
            if (!markChatOpen(userId)) {
                //we'll need to get it from server
                conversationService.get(userId,
               function (response) {
                   if (response.Success) {
                       $scope.openChats.push({
                           conversation: response.Conversation,
                           userId: response.UserId
                       });
                       markChatOpen(userId);
                   }
               });
            }
        }
    }
]);