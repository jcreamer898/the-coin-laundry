var oa = require('../utils/oauth'),
    _ = require('underscore'),
    fs = require('fs');

/*
Leagues
http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/leagues?format=json
Or,
http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games/leagues?format=json

Leagues/Teams
http://fantasysports.yahooapis.com/fantasy/v2/league/331.l.135247/teams?format=json
Player Search
http://fantasysports.yahooapis.com/fantasy/v2/league/331.l.135247/players;search=smith?format=json
*/

var isProd = process.env.PROD;

module.exports = {
    'leagues/:id/players': {
        get: function(req, res) {
            var queryString = _.map(req.query, function(val, key) {
                return key + '=' + val;
            }).join(';');
            console.log(queryString);
            oa.get(req.session).getProtectedResource(
                ('http://fantasysports.yahooapis.com/fantasy/v2/league/TEAM/players/stats;' + queryString + '?format=json')
                    .replace('TEAM', req.params.id),
                'GET',
                req.session.oauth_access_token,
                req.session.oauth_access_token_secret,
                function(err, data) {
                    
                    var data = JSON.parse(data),
                        playerData = data.fantasy_content.league[1].players,
                        players = [],
                        player = {};

                    _.each(playerData, function(value) {
                        if (value.player) {
                            player = {};
                            
                            _.each(value.player[0], function(kvp) {
                                if (kvp === Object(kvp)) {
                                    _.each(kvp, function(val, key) {
                                        player[key] = val;
                                    });
                                } 
                            });

                            if (value.player[1] && value.player[1].player_stats) {
                                player.points = value.player[1].player_points.total;
                            }

                            players.push(player);
                        }

                    });

                    res.json(players);
                });
        }
    },
    'leagues': {
        get: function(req, res) {
            oa.get(req.session).getProtectedResource(
                'http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/leagues?format=json',
                'GET',
                req.session.oauth_access_token,
                req.session.oauth_access_token_secret,
                function(err, data, response) {
                    var data = JSON.parse(data),
                        leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues,
                        leagues = [],
                        league = {};

                    _.each(leagueData, function(value, key) {
                        if (value.league) leagues.push(value.league[0]);
                    });

                    res.json(leagues);
                });
        }
    },
    'leagues/:id/teams': {
        get: function(req, res) {
            oa.get(req.session).getProtectedResource(
                'http://fantasysports.yahooapis.com/fantasy/v2/league/LEAGUEID/teams?format=json'.replace('LEAGUEID', req.params.id),
                'GET',
                req.session.oauth_access_token,
                req.session.oauth_access_token_secret,
                function(err, data) {
                    var data = JSON.parse(data),
                        teamData = data.fantasy_content.league[1].teams,
                        teams = [],
                        team;

                    _.each(teamData, function(value) {
                        if (value.team) {
                            team = {};
                            
                            _.each(value.team[0], function(kvp) {
                                if (kvp === Object(kvp)) {
                                    _.each(kvp, function(val, key) {
                                        team[key] = val;
                                    });
                                } 
                            });

                            teams.push(team);
                        }
                    });

                    res.json(teams);
                });
        }
    },
    'teams/:id': {
        get: function(req, res) {
            // if (!isProd) {
            //     fs.readFile(__dirname + "/../fixtures/team.json", function(err, contents) {
            //         if (err) throw err;

            //         res.send(JSON.parse(contents));
            //     });
            //     return;
            // }

            oa.get(req.session).getProtectedResource(
                'http://fantasysports.yahooapis.com/fantasy/v2/team/TEAM/players?format=json'
                .replace("TEAM", req.params.id),
                'GET',
                req.session.oauth_access_token,
                req.session.oauth_access_token_secret,
                function(err, data, response) {
                    var data = JSON.parse(data),
                        teamData = data.fantasy_content.team[0],
                        playerData = data.fantasy_content.team[1].players,
                        players = [],
                        team = {};

                    _.each(teamData, function(kvp) {
                        _.each(kvp, function(value, key) {
                            if (kvp === Object(kvp)) {
                                team[key] = value;
                            }
                        });
                    });


                    _.each(playerData, function(p) {
                        if (p.player) {
                            var player = {};

                            _.each(p.player[0], function(kvp) {
                                _.each(kvp, function(value, key) {
                                    if (kvp === Object(kvp)) {
                                        player[key] = value;
                                    }
                                });
                            });

                            players.push(player);
                        }
                    });

                    team.players = players;

                    res.json(team);
                });
        }
    },
    teams: {
        get: function(req, res) {
            // if (!isProd) {
            //     fs.readFile(__dirname + "/../fixtures/teams.json", function(err, contents) {
            //         if (err) throw err;

            //         console.log(contents);
            //         res.send(JSON.parse(contents));
            //     });
            //     return;
            // }

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
    },
    sandbox: {
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
};