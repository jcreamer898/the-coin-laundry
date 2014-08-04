'use strict';

var express = require('express'),
    path = require('path'),
    _ = require('underscore'),
    oa = require('./server/utils/oauth'),
    app = express(),
    CoinLaundry = require('./server/coinlaundryApp'),
    db = require('./server/db/context').db,
    io;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ 
    key: 'coinlaundry', 
    secret: 'theleague', 
    proxy: true 
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.coinlaundry = new CoinLaundry(app, db);

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io = require('socket.io')(server);

var Chat = require('./server/db/models/chat');

io.on('connection', function (socket) {
    Chat.find(function(err, chats) {
        if (chats.length) {
            _.each(chats, function(chat) {
                socket.emit('chat.message', { 
                    message: chat.message,
                    user: chat.user
                });
            });
        }
    });
    
    socket.on('chat.send', function (data) {
        var chat = new Chat({
            user: data.user,
            message: data.message,
            yahoo_id: data.yahoo_id
        });

        chat.save(function() {
            socket.broadcast.emit('chat.message', { 
                message: data.message,
                user: data.user
            });   
        });
    });
});
