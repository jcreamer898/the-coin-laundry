(function(global) {
    var app = angular.module('app', []),
        PROD = !~window.location.href.indexOf('local');

    var apiRoutes = {
        myTeam: PROD ? '/api/myteam' : '/javascripts/fixtures/myteam.json'
    };

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/javascripts/views/home.html',
                controller: 'HomeController'
            })
            .when('/myteams', {
                templateUrl: '/javascripts/views/myteam.html',
                controller: 'MyTeamsController'
            })
            .otherwise({
                template: '<h1>Not found</h1>'
            });
    });

    app.controller('HomeController', function() {

    });

    app.controller('MyTeamsController', function($scope, $http) {
        $http({
            method: 'get',
            url: apiRoutes.myTeam
        }).success(function(data) {
            var teamsData = data.fantasy_content.users[0]
                    .user[1]
                    .games[0]
                    .game[1]
                    .teams,
                teams = [];

            angular.forEach(teamsData, function(obj) {
                var teamData = {};

                if (obj.team) {
                    angular.forEach(obj.team[0], function(kvp) {
                        if (kvp === Object(kvp)) {
                            angular.forEach(kvp, function(value, key) {
                                teamData[key] = value;
                            });
                        }
                    });

                    teams.push(teamData);
                }
                
            });

            $scope.teams = teams;
        });
    });



    global.app = app;
}(window));