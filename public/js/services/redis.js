var redisServices = angular.module('redisServices', []);

redisServices.service('Keys', function($http, $q) {

    this.baseUrl = 'http://localhost:7379';

    this.all = function() {
        var deferred = $q.defer();
        $http.get(this.baseUrl + '/KEYS/*').success(function(data) {
            deferred.resolve(data['KEYS']);
        });
        return deferred.promise;
    };

    this.details = function(key) {
        var deferred = $q.defer();
        if (!key) {
            return deferred.promise;
        }

        var url = this.baseUrl + '/TYPE/' + encodeURIComponent(key);
        var that = this;
        $http.get(url).success(function(data) {
            var type = data['TYPE'][1];
            var getters = {
                none: function() { },
                string: function() {
                    var url = that.baseUrl + '/GET/' + encodeURIComponent(key);
                    $http.get(url).success(function(data) {
                        deferred.resolve({
                            type: type,
                            details: data['GET']
                        });
                    });
                },
                list: function() {
                    var url = that.baseUrl + '/LRANGE/'
                        + encodeURIComponent(key) + '/0/9999';
                    $http.get(url).success(function(data) {
                        deferred.resolve({
                            type: type,
                            details: data['LRANGE']
                        });
                    });
                },
                hash: function() {
                    var url = that.baseUrl + '/HGETALL/'
                        + encodeURIComponent(key);
                    $http.get(url).success(function(data) {
                        deferred.resolve({
                            type: type,
                            details: data['HGETALL']
                        });
                    });
                },
                set: function() {
                    var url = that.baseUrl + '/SMEMBERS/'
                        + encodeURIComponent(key);
                    $http.get(url).success(function(data) {
                        deferred.resolve({
                            type: type,
                            details: data['SMEMBERS']
                        });
                    });
                },
                zset: function() {
                    var url = that.baseUrl + '/ZRANGE/'
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
    };

});