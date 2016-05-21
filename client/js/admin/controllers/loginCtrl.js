/**
 * Created by yuliya on 19.3.16.
 */
routeAppAdmin.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location){
    $scope.user = {};
    $scope.login = function () {
        $http.post('/api/login', {
            username: $scope.user.username,
            password: $scope.user.password,
        })
            .success(function (user) {
                $rootScope.message = 'Authentication successful';
                //TODO change location
                $location('/api/user');
            })
            .error(function () {
                $rootScope.message = 'Authentication failed';
                $location.url('/');
            });
    };
}]);