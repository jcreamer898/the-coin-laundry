var OAuth = require('oauth').OAuth;

exports.myteam = function(req, res) {
    var oa = new OAuth(req.session.oa._requestUrl,
        req.session.oa._accessUrl,
        req.session.oa._consumerKey,
        req.session.oa._consumerSecret,
        req.session.oa._version,
        req.session.oa._authorize_callback,
        req.session.oa._signatureMethod);

    oa.getProtectedResource('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/teams?format=json',
        'GET',
        req.session.oauth_access_token,
        req.session.oauth_access_token_secret, 
        function(err, data, response) {
            res.json(JSON.parse(data));
        });
};