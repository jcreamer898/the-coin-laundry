var oa = require('../utils/oauth');

exports.myteam = {
    get: function(req, res) {
        oa.get().getProtectedResource('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/teams?format=json',
            'GET',
            req.session.oauth_access_token,
            req.session.oauth_access_token_secret, 
            function(err, data, response) {
                res.json(JSON.parse(data));
            });
    }
};

exports.sandbox = {
    post: function(req, res) {
        oa.get().getProtectedResource(req.body.url,
            'GET',
            req.session.oauth_access_token,
            req.session.oauth_access_token_secret, 
            function(err, data, response) {
                res.json(JSON.parse(data));
            });
    }
}
