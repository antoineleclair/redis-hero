redisApp.controller('KeyListCtrl', function($scope, Keys) {

    Keys.all().then(function(keys) {
        $scope.keys = keys;
    });

});