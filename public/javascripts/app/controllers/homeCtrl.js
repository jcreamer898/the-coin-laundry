define(function(require) {
    var controllers = require("controllers/controllers");

    function HomeCtrl() {
        this.welcome = "THE Fantasy League";
    }

    return controllers.controller('HomeCtrl', HomeCtrl);
});
