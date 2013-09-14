(function(global) {
    var app = angular.module('app', []),
        PROD = !~window.location.href.indexOf('local');

    var apiRoutes = {
        teams: PROD ? '/api/teams' : '/javascripts/fixtures/teams.json',
        team:  PROD ? '/api/teams' : '/javascripts/fixtures/team.json',
    };

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/javascripts/views/home.html',
                controller: 'HomeController'
            })
            .when('/teams', {
                templateUrl: '/javascripts/views/teams.html',
                controller: 'TeamsController'
            })
            .when('/teams/:id', {
                templateUrl: '/javascripts/views/team.html',
                controller: 'TeamController'
            })
            .when('/sandbox', {
                templateUrl: 'javascripts/views/sandbox.html',
                controller: 'SandboxController'
            })
            .otherwise({
                template: '<h1>Not found</h1>'
            });
    });

    app.factory('FantasyService', function($http) {
        return {
            team: function() {
                return $http({
                    method: 'get',
                    url: PROD ? apiRoutes.team + '/' + $routeParams.id : '/javascripts/fixtures/team.json'
                });
            }
        }
    });

    app.controller('HomeController', function() {

    });

    app.controller('SandboxController', function($scope, $http) {
        $scope.url = 'http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/teams?format=json';

        $scope.send = function(url) {
            $http({
                method: 'post',
                url: '/api/sandbox',
                data: {
                    url: url
                }
            }).success(function(data) {
                $scope.results = JSON.stringify(data, null, 4);
            });
        };
    });


    app.controller('TeamsController', function($scope, $http) {
        $http({
            method: 'get',
            url: apiRoutes.teams
        }).success(function(data) {
            $scope.teams = data;
        });
    });

    app.controller('TeamController', function($scope, FantasyService, $routeParams) {
        FantasyService.team().success(function(data) {
            var teamData = data.fantasy_content.team[0],
                playerData = data.fantasy_content.team[1].players,
                players = [],
                team = {};

            angular.forEach(teamData, function(kvp) {
                angular.forEach(kvp, function(value, key) {
                    if (kvp === Object(kvp)) {
                        team[key] = value;
                    }
                });
            });

            
            angular.forEach(playerData, function(p) {
                if (p.player) {
                    var player = {};

                    angular.forEach(p.player[0], function(kvp) {
                        angular.forEach(kvp, function(value, key) {
                            if (kvp === Object(kvp)) {
                                player[key] = value;
                            }
                        });
                    });

                    players.push(player);
                }
            });

            team.players = players;

            $scope.team = team;
        });
    });



    global.app = app;
}(window));