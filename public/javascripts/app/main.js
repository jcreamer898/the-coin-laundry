require.config({
    paths: {
        jquery: "/javascripts/vendor/jquery/jquery",
        angular: "/javascripts/vendor/angular/angular",
        ngRoute: "/javascripts/vendor/angular-route/angular-route",
        markdown: "/javascripts/vendor/markdown/lib/markdown",
        bootstrap: "/javascripts/vendor/bootstrap/dist/js/bootstrap"
    },
    shim: {
        bootstrap: {
            exports: "bootstrap",
            deps: ["jquery"]
        },
        angular: {
            exports: "angular",
            deps: ["jquery"]
        },
        markdown: {
            exports: "markdown"
        },
        ngRoute: {
            deps: ["angular"]
        }
    },
    packages: ["controllers", "services", "directives"]
});

require(["jquery", "angular", "bootstrap", "app"], function($, angular) {
    angular.bootstrap(document.documentElement, ['app']);
});