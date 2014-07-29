define(function(require) {
    var controllers = require("controllers/controllers");

    function HomeCtrl(User) {
        this.welcome = "THE Fantasy League";
        this.user = {
            id: User.id
        };
    }

    return controllers.controller("HomeCtrl", HomeCtrl);
});
