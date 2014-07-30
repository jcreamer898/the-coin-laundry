
/*
 * GET home page.
 */
var oa = require('../utils/oauth'),
    User = require('../db/models/user'),
    _ = require('underscore');

exports.index = function(req, res) {
    oa.get(req.session).getProtectedResource(
        'https://social.yahooapis.com/v1/user/ID/profile/usercard?format=json'.replace('ID', req.session.xoauth_yahoo_guid ),
        'GET',
        req.session.oauth_access_token,
        req.session.oauth_access_token_secret,
        function(err, data) {
            data = JSON.parse(data);
            data = data.profile;

            User.findOne({ 
                'yahoo_id': req.session.xoauth_yahoo_guid 
            }, function(err, user) {
                console.log(user);
                if (!user) {
                    user = new User({
                        yahoo_id: req.session.xoauth_yahoo_guid,
                        displayAge: data.displayAge,
                        gender: data.gender,
                        imageUrl: data.image.imageUrl,
                        location: data.location,
                        nickname: data.nickname,
                        profileUrl: data.profileUrl
                    });
                }
                else {
                    user.displayAge = data.displayAge;
                    user.gender = data.gender;
                    user.imageUrl = data.image.imageUrl;
                    user.location = data.location;
                    user.nickname = data.nickname;
                    user.profileUrl = data.profileUr;
                }

                user.save(function(err) {
                    var u = user.toObject();
                    
                    delete u._id;
                    delete u._v;

                    if (err) throw err;

                    res.render('index', { 
                        title: 'Express',
                        user: JSON.stringify(u)
                    });
                });
            });
        });
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
                req.session.xoauth_yahoo_guid = results2.xoauth_yahoo_guid;

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
                req.session.xoauth_yahoo_guid = results2.xoauth_yahoo_guid;

                res.redirect(req.query.redirect_to || '/');
            }
    });
};

exports.logout = function(req, res) {
    req.session = {};

    res.redirect('/');
};