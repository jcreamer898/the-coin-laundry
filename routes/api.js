var oa = require('../utils/oauth'),
    _ = require('underscore');

exports.myteam = {
    get: function(req, res) {
        oa.get(req.session).getProtectedResource('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/teams?format=json',
            'GET',
            req.session.oauth_access_token,
            req.session.oauth_access_token_secret, 
            function(err, data, response) {
                var teamsData = JSON.parse(data).fantasy_content.users[0]
                    .user[1]
                    .games[0]
                    .game[1]
                    .teams,
                teams = [];

                _.each(teamsData, function(obj) {
                    var teamData = {};

                    if (obj.team) {
                        _.each(obj.team[0], function(kvp) {
                            if (kvp === Object(kvp)) {
                                _.each(kvp, function(value, key) {
                                    teamData[key] = value;
                                });
                            }
                        });

                        teams.push(teamData);
                    }
                });

                res.json(teams);
            });
    }
};

exports.sandbox = {
    post: function(req, res) {
        oa.get(req.session).getProtectedResource(req.body.url,
            'GET',
            req.session.oauth_access_token,
            req.session.oauth_access_token_secret, 
            function(err, data, response) {
                res.json(JSON.parse(data));
            });
    }
}
