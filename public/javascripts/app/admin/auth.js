define(function (require) {
    var admin = require("admin/adminModule");

    admin.factory("auth", ["$http", "$q", function($http, $q) {
        return {
            isAdmin: function(id) {
                var deferred = $q.defer();

                $http({
                    type: "GET",
                    url: "/api/admin/authenticate/" + id
                }).success(function(json) {
                    deferred.resolve(json.data);
                });

                return deferred.promise;
            }
        }; 
    }]);
});