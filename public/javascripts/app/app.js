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
            .when('/sandbox', {
                templateUrl: 'javascripts/views/sandbox.html',
                controller: 'SandboxController'
            })
            .otherwise({
                template: '<h1>Not found</h1>'
            });
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


    app.controller('MyTeamsController', function($scope, $http) {
        $http({
            method: 'get',
            url: apiRoutes.myTeam
        }).success(function(data) {
            $scope.teams = data;
        });
    });



    global.app = app;
}(window));