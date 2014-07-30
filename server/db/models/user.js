'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = mongoose.model('User', {
        first: String,
        last: String,
        yahoo_id: String,
        teams: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Team' 
        }]
});

module.exports = User;