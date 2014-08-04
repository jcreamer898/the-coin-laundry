'use strict';
var mongoose = require('mongoose');

var Chat = mongoose.model('Chat', {
    yahoo_id: String,
    user: String,
    message: String
});

module.exports = Chat;