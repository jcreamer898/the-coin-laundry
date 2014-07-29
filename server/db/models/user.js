'use strict';
var mongoose = require('mongoose');

var User = mongoose.model('User', {
        first: String,
        last: String,
        yahoo_id: String
});

module.exports = User;