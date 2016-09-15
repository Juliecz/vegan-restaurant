angular.module('veganapp.admin')
    .controller('loginCtrl', ['$scope', '$state', '$http', '$rootScope', '$location', 'authProvider', function($scope, $state, $http, $rootScope, $location, authProvider){
    $scope.user = {};
    $scope.login = function () {
        authProvider.login($scope.user.username, $scope.user.password)
            .then(function (data) {
                $state.go('admin');
            })
            .catch(function () {
                $scope.outputData = 'Zadejte spravne udaje';
            });
    };
        
}]);