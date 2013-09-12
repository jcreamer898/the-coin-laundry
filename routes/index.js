
/*
 * GET home page.
 */
var OAuth2 = require('oauth').OAuth2;

var oauth = new OAuth2(
    'dj0yJmk9Tzh5WDgxTXBGRHJzJmQ9WVdrOVMxTmxTMkpoTlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMg--',
    'cda4f2845d41c1fe43e380a68d9acf793b387cd3',
    'https://api.login.yahoo.com/',
    'oauth/v2/get_token',
    'oauth/v2/get_request_token'
);

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.authorize = function(req, res) {
    res.redirect(oauth.getAuthorizeUrl());
};