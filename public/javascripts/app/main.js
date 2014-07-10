require.config({
    paths: {
        angular: "/javascripts/vendor/angular/angular",
        ngRoute: "/javascripts/vendor/angular-route/angular-route"
    },
    shim: {
        angular: {
            exports: "angular"
        },
        ngRoute: {
            deps: ["angular"]
        }
    },
    packages: ["controllers", "services"]
});

require(["angular", "app"], function(angular) {
    angular.bootstrap(document.documentElement, ['app']);
});