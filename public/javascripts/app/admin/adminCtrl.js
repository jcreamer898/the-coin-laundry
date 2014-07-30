define(function(require) {
    var admin = require("admin/adminModule");

    function AdminCtrl(auth, User) {
        auth.isAdmin(User.yahoo_id).then(function(admin) {
            this.welcome = admin ? "THE Fantasy League" : "You shall not pass!";    
        }.bind(this));
    }

    return admin.controller("AdminCtrl", AdminCtrl);
});
