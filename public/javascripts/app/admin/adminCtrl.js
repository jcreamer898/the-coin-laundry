define(function(require) {
    var admin = require("admin/adminModule");

    function AdminCtrl(auth, User, $routeParams) {
        var self = this;

        // TODO: Get this out of here... naow.
        $("#adminTools a[data-target=\"#" + $routeParams.tool + "\"]").tab("show");

        auth.isAdmin(User.yahoo_id).then(function(admin) {
            self.welcome = admin ? "THE Fantasy League" : "You shall not pass!";    
        });
    }

    return admin.controller("AdminCtrl", AdminCtrl);
});
