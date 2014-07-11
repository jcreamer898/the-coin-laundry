'use strict';
var mongoose = require('mongoose');

var User = mongoose.model('User', {
        first: String,
        last: String
});

module.exports = User;