var redisServices = angular.module('redisServices', []);

redisServices.factory('Keys', function($http, $q) {
    return {
        all: function() {
            var deferred = $q.defer();
            $http.get('http://localhost:7379/KEYS/*').success(function(data) {
                deferred.resolve(data['KEYS']);
            });
            return deferred.promise;
        }
    };
});