define(function(require) {
    var controllers = require("controllers/controllers");

    function AppCtrl(User, $scope) {
        $scope.user = User;
    }

    return controllers.controller("AppCtrl", AppCtrl);
});
