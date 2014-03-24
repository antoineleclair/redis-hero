redisApp.controller('KeyListCtrl', function($scope, Keys) {

    Keys.all().then(function(keys) {
        $scope.keys = keys;
    });

    $scope.keyClicked = function(key) {
        $scope.current.key = key;
    };

    $scope.Keys = Keys;

    $scope.$watch('Keys.baseUrl', function(val) {
        Keys.all().then(function(keys) {
            $scope.keys = keys;
        });
    });

});