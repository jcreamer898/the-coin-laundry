define(function(require) {
    var angular = require("angular"),
        controllers = require("controllers"),
        services = require("services"),
        ngRoute = require("ngRoute"),
        app;

    app = angular.module("app", [
            "ngRoute",
            "coin.controllers",
            "coin.services" ]);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/javascripts/views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .when('/teams', {
                templateUrl: '/javascripts/views/teams.html',
                controller: 'TeamsCtrl'
            })
            .when('/teams/:id', {
                templateUrl: '/javascripts/views/team.html',
                controller: 'TeamCtrl'
            })
            .when('/sandbox', {
                templateUrl: 'javascripts/views/sandbox.html',
                controller: 'SandboxCtrl'
            })
            .otherwise({
                template: '<h1>Not found</h1>'
            });
    });

    window.app = app;

    return app;
});