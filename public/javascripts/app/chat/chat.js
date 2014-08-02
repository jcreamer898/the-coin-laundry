define(function(require) {
    var chat = require("chat/chatModule"),
        io = require("socketio");

    function Chat() {
        var socket = io("/"),
            messages = [];

        return {
            messages: messages,
            send: function(msg) {
                messages.push(msg);

                socket.emit("chat.send", { 
                    message: msg 
                });
            }
        };
    }

    return chat.factory("Chat", Chat);
});
