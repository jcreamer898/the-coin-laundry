
/*
 * GET home page.
 */
var OAuth = require('oauth').OAuth;

exports.index = function(req, res) {
    if (req.session.oauth_token) {
        //http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/teams
        var oa = new OAuth(req.session.oa._requestUrl,
            req.session.oa._accessUrl,
            req.session.oa._consumerKey,
            req.session.oa._consumerSecret,
            req.session.oa._version,
            req.session.oa._authorize_callback,
            req.session.oa._signatureMethod);

        oa.getProtectedResource('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/teams',
            'GET',
            req.session.oauth_access_token,
            req.session.oauth_access_token_secret, 
            function(err, data, response) {
                res.json(data);
            });
    }
    else {
        res.render('index', { title: 'Express' });    
    }
    
};

exports.oauth = function(req, res) {
    var oa = new OAuth(
        'https://api.login.yahoo.com/oauth/v2/get_request_token',
        'https://api.login.yahoo.com/oauth/v2/request_auth',
        'dj0yJmk9Tzh5WDgxTXBGRHJzJmQ9WVdrOVMxTmxTMkpoTlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMg--',
        'cda4f2845d41c1fe43e380a68d9acf793b387cd3',
        '1.0',
        'http://thecoinlaundry.azurewebsites.net/authorize',
        'HMAC-SHA1'
    );

    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        req.session.oa = oa;
        req.session.oauth_token = oauth_token;
        req.session.oauth_token_secret = oauth_token_secret;
        
        res.redirect("https://api.login.yahoo.com/oauth/v2/request_auth?oauth_token=" + oauth_token);
    });
};

exports.authorize = function(req, res) {
    var oa = new OAuth(req.session.oa._requestUrl,
        req.session.oa._accessUrl,
        req.session.oa._consumerKey,
        req.session.oa._consumerSecret,
        req.session.oa._version,
        req.session.oa._authorize_callback,
        req.session.oa._signatureMethod);

    oa.getOAuthAccessToken(
        req.session.oauth_token, 
        req.session.oauth_token_secret, 
        req.param('oauth_verifier'),
        function(error, oauth_access_token, oauth_access_token_secret, results2) {
            if(error) {
                res.json(error);
            }
            else {
                // store the access token in the session
                req.session.oauth_access_token = oauth_access_token;
                req.session.oauth_access_token_secret = oauth_access_token_secret;

                res.redirect("/");
            }
    });
};