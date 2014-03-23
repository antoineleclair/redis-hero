redisApp.controller('DetailsCtrl', function($scope, Keys) {

    $scope.$watch('current.key', function(key) {
        Keys.details(key).then(function(data) {
            $scope.type = data.type;
            $scope.details = data.details;
        });
    });

});