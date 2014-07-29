
/*
 * GET home page.
 */
var oa = require('../utils/oauth');

exports.index = function(req, res) {
    res.render('index', { title: 'Express' });
};  

exports.oauth = function(req, res) {
    oa.get(req.session).getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        req.session.oa = oa.get();
        req.session.oauth_token = oauth_token;
        req.session.oauth_token_secret = oauth_token_secret;
        
        res.redirect("https://api.login.yahoo.com/oauth/v2/request_auth?oauth_token=" + oauth_token);
    });
};

exports.authorize = function(req, res) {
    req.session.oauth_verifier = req.param('oauth_verifier');

    oa.get(req.session).getOAuthAccessToken(
        req.session.oauth_token, 
        req.session.oauth_token_secret, 
        req.session.oauth_verifier,
        function(error, oauth_access_token, oauth_access_token_secret, results2) {
            if(error) {
                res.json(error);
            }
            else {
                // store the access token in the session
                req.session.oauth_access_token = oauth_access_token;
                req.cookies.access_token = oauth_access_token;
                req.session.oauth_access_token_secret = oauth_access_token_secret;
                req.session.timestamp = new Date();
                req.session.oauth_session_handle = results2.oauth_session_handle;

                res.redirect('/');
            }
    });
};

exports.refresh = function(req, res) {
    oa.get(req.session).refreshOAuthAccessToken(
        req.session.oauth_access_token, 
        req.session.oauth_access_token_secret, 
        req.session.oauth_session_handle,
        function(error, oauth_access_token, oauth_access_token_secret, results2) {
            if(error) {
                res.json(error);
            }
            else {
                // store the access token in the session
                req.session.oauth_access_token = oauth_access_token;
                req.cookies.access_token = oauth_access_token;
                req.session.oauth_access_token_secret = oauth_access_token_secret;
                req.session.timestamp = new Date();
                req.session.oauth_session_handle = results2.oauth_session_handle;

                res.redirect('/');
            }
    });
};

exports.logout = function(req, res) {
    req.session = {};

    res.redirect('/');
};