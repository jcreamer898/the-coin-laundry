define(function(require) {
    var chat = require("chat/chatModule"),
        io = require("socketio");


    function ChatCtrl(Chat, $scope, User) {
        var self = this,
            socket = io("/");
        
        this.message = "";
        this.messages = Chat.messages;
        
        socket.on("chat.send", function (data) {
            self.messages.unshift(data);

            $scope.$apply();
        });

        this.send = function() {
            this.messages.unshift({
                message: this.message,
                user: User.nickname
            });

            socket.emit("chat.send", { 
                message: this.message,
                user: User.nickname
            });
            
            this.message = "";
        };

        this.typing = function(event) {
            console.log(arguments);
        };
    }

    return chat.controller("ChatCtrl", ChatCtrl);
});
