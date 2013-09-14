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
    console.log(session.oa);
    return oa
};

exports.checkLogin = function(req, res, next) {
    // No token has been created yet
    if (!req.session.oauth_access_token && !~req.url.indexOf('oauth') && isProd(req)) {
        res.redirect('/oauth');
    }
    // Check the token
    else if (req.session.oauth_token && req.session.oauth_access_token && isProd(req)) {
        console.log('refreshing token', req.session.oauth_verifier);
        get(req.session).getOAuthAccessToken(
            req.session.oauth_token, 
            req.session.oauth_token_secret, 
            req.session.oauth_verifier ,
            function(error, oauth_access_token, oauth_access_token_secret, results2) {
                if(error) {
                    res.json(error);
                }
                else {
                    // store the access token in the session
                    // 
                    req.session.oauth_access_token = oauth_access_token;
                    req.cookies.access_token = oauth_access_token;
                    req.session.oauth_access_token_secret = oauth_access_token_secret;

                    next();
                }
        });
    }
    else {
        console.log('local');
        next();
    }
};