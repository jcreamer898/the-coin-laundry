var OAuth = require('oauth').OAuth,
    config = require('../config.json'),
    get,
    isProd = function(req) {
        return !~req.get('host').indexOf('local');
    };

exports.get = get = function(session) {
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
        )
    
    return oa
};

exports.checkLogin = function(req, res, next) {
    // No token has been created yet
    console.log(req.session.timestamp, Math.round(((new Date() - new Date(req.session.timestamp)) % 86400000) / 3600000));
    if ((!req.session.oauth_access_token && !~req.url.indexOf('oauth') && !req.session.timestamp ||
        Math.round(((new Date() - new Date(req.session.timestamp)) % 86400000) / 3600000) >= 1) && 
        isProd(req)) {
        res.redirect('/oauth');
    }
    else {
        next();
    }
};