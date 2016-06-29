angular.module('veganapp.admin')
    .controller('meCtrl', ['$scope', '$state', 'authProvider', 'userFactory', function ($scope, $state, authProvider, userFactory) {
        authProvider.isLoggedIn()
            .then(function (data) {
                userFactory.getUserById(data.data)
                    .success(function (data) {
                        $scope.me = data;
                    });
            });
        $scope.ch = ['one', 'two', 'three'];
        $scope.a = $scope.ch[0];
        //$scope.check = ['one', 'two'];
        /*function checked() {
        }*/
    }]);