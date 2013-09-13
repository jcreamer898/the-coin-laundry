
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
    oa.get(req.session).getOAuthAccessToken(
        req.session.oauth_token, 
        req.session.oauth_token_secret, 
        req.param('oauth_verifier'),
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

                res.redirect('/');
            }
    });
};