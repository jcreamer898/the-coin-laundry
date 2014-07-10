define(function (require) {
    var services = require("services/services");

    function Teams($http, $routeParams) {
        return {
            team: function() {
                return $http({
                    method: 'get',
                    url: '/api/teams/' + $routeParams.id
                });
            },
            teams: function() {
               return $http({
                    method: 'get',
                    url: '/api/teams'
                });
            }
        }
    }

    return services.factory("Teams", Teams);
});