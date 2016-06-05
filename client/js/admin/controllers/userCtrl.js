angular.module('veganapp.admin')
    .controller('userCtrl', ['$scope', '$state', 'authProvider', function ($scope, $state, authProvider) {
        authProvider.isLoggedIn()
            .then(function (data) {
                $scope.id = data;
            });
    }]);