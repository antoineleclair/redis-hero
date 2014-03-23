var redisServices = angular.module('redisServices', []);

redisServices.factory('Keys', function($http, $q) {

    return {
        all: function() {
            var deferred = $q.defer();
            $http.get('http://localhost:7379/KEYS/*').success(function(data) {
                deferred.resolve(data['KEYS']);
            });
            return deferred.promise;
        },
        details: function(key) {
            var deferred = $q.defer();
            if (!key) {
                return deferred.promise;
            }
            var url = 'http://localhost:7379/TYPE/' + encodeURIComponent(key);
            $http.get(url).success(function(data) {
                var type = data['TYPE'][1];
                var getters = {
                    none: function() { },
                    string: function() {
                        var url = 'http://localhost:7379/GET/'
                            + encodeURIComponent(key);
                        $http.get(url).success(function(data) {
                            deferred.resolve({
                                type: type,
                                details: data['GET']
                            });
                        });
                    },
                    list: function() {
                        var url = 'http://localhost:7379/LRANGE/'
                            + encodeURIComponent(key) + '/0/9999';
                        $http.get(url).success(function(data) {
                            deferred.resolve({
                                type: type,
                                details: data['LRANGE']
                            });
                        });
                    },
                    hash: function() {
                        var url = 'http://localhost:7379/HGETALL/'
                            + encodeURIComponent(key);
                        $http.get(url).success(function(data) {
                            deferred.resolve({
                                type: type,
                                details: data['HGETALL']
                            });
                        });
                    },
                    set: function() {
                        var url = 'http://localhost:7379/SMEMBERS/'
                            + encodeURIComponent(key);
                        $http.get(url).success(function(data) {
                            deferred.resolve({
                                type: type,
                                details: data['SMEMBERS']
                            });
                        });
                    },
                    zset: function() {
                        var url = 'http://localhost:7379/ZRANGE/'
                            + encodeURIComponent(key) + '/0/9999';
                        $http.get(url).success(function(data) {
                            deferred.resolve({
                                type: type,
                                details: data['ZRANGE']
                            });
                        });
                    }
                };

                getters[type]();
            });
            return deferred.promise;
        }
    };

});