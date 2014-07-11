define(function(require) {
    var angular = require("angular"),
        controllers = require("controllers"),
        controllers = require("directives"),
        services = require("services"),
        ngRoute = require("ngRoute"),
        app;

    app = angular.module("app", [
            "ngRoute",
            "coin.controllers",
            "coin.services",
            "coin.directives" ]);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/javascripts/views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .when('/rules', {
                templateUrl: '/javascripts/views/rules.html',
                controller: 'RulesCtrl',
                controllerAs: 'rules'
            })
            .when('/players', {
                templateUrl: '/javascripts/views/players.html',
                controller: 'PlayersCtrl',
                controllerAs: 'players'
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