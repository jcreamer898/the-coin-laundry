require.config({
    paths: {
        angular: "/javascripts/vendor/angular/angular",
        ngRoute: "/javascripts/vendor/angular-route/angular-route",
        markdown: "/javascripts/vendor/markdown/lib/markdown"
    },
    shim: {
        angular: {
            exports: "angular"
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

require(["angular", "app"], function(angular) {
    angular.bootstrap(document.documentElement, ['app']);
});