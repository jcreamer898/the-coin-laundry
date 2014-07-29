'use strict';

var OAuth = require('oauth').OAuth,
    config = require('../config.js');

exports.get = function(session) {
    var oa = (session || {}).oa ? 
        new OAuth(
            session.oa._requestUrl,
            session.oa._accessUrl,
            session.oa._consumerKey,
            session.oa._consumerSecret,
            session.oa._version,
            session.oa._authorize_callback,
            session.oa._signatureMethod
        ) :
        new OAuth(
            config.accessTokenUrl,
            config.requestTokenUrl,
            config.oauthKey,
            config.oauthSecret,
            config.version,
            config.callback,
            config.encryption
        );
    
    return oa;
};

exports.authorize = function(req, res, next) {
    // No token has been created yet
    if ((!req.session.oauth_access_token && !req.session.timestamp && !~req.url.indexOf('oauth'))) {
        res.redirect('/oauth');
    }
    else if ((Math.round(((new Date() - new Date(req.session.timestamp)) % 86400000) / 3600000) >= 1) && !~req.url.indexOf('refresh')) {
        res.redirect('/refresh');
    }
    else {
        next();
    }
};