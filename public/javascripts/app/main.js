require.config({
    paths: {
        jquery: "/javascripts/vendor/jquery/jquery",
        angular: "/javascripts/vendor/angular/angular",
        ngRoute: "/javascripts/vendor/angular-route/angular-route",
        markdown: "/javascripts/vendor/markdown/lib/markdown",
        bootstrap: "/javascripts/vendor/bootstrap/dist/js/bootstrap",
        flot: "lib/flot/jquery.flot",
        "flot-data": "lib/flot/flot-data",
        morris: "lib/morris/morris",
        morrisData: "lib/morris/morris-data",
        raphael: "lib/morris/raphael.min",
        socketio: "/socket.io/socket.io"
    },
    shim: {
        socketio: {
            exports: "io"
        },
        raphael: {
            exports: "Raphael"
        },
        morrisData: {
            deps: ["morris"]
        },
        morris: {
            deps: ["jquery", "raphael"],
            exports: "Morris"
        },
        "flot-data": {
            deps: ["flot"]
        },
        flot: {
            deps: ["jquery"]
        },
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
    packages: ["controllers", "services", "directives", "admin"]
});

require(["jquery", "angular", "socketio", "bootstrap", "app", "raphael", "morris", "morrisData"], function($, angular, io) {
    var socket = io("http://localhost:3000");
    socket.on("news", function (data) {
        console.log(data);
        socket.emit("my other event", { my: "data" });
    });
    angular.bootstrap(document.documentElement, ["app"]);
});