define(function (require) {
    var services = require("services/services");

    function User() {
        return {
            id: window.yahoo_user_id
        };
    }

    return services.factory("User", User);
});