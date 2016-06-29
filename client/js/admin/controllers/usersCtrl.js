angular.module('veganapp.admin')
    .controller('usersCtrl', ['$scope', '$state', '$stateParams', '$window', 'getMenu', 'dailyMenuAdmin', 'userFactory', 'authProvider', function ($scope, $state, $stateParams, $window, getMenu, dailyMenuAdmin, userFactory, authProvider) {
        authProvider.isLoggedIn()
            .then(function (data) {
                userFactory.getUserById(data.data)
                    .success(function (data) {
                        $scope.me = data;
                        if (data.role === 'employee') {
                            $state.go('admin.me');
                        }
                    });
            });
        userFactory.getAllUsers()
            .success(function (data) {
                $scope.users = data;
                //console.log(data);
            });
        $scope.setAction = function (action, id, typ) {
            if (typ === 'user') {
                if (action === 'delete') {
                    userFactory.deleteUser(id);
                    userFactory.getAllUsers()
                        .success(function (data) {
                            $scope.users = data;
                        });
                }
                else if (action === 'edit') {
                    var res = {};
                    res = {
                        action: action,
                        id: id,
                        menuType: typ
                    };
                    $state.go('admin.edit/:id', res);
                }
                else if (action === 'new') {
                    var res = {};
                    res = {
                        action: action,
                        id: id,
                        menuType: typ
                    };
                    $state.go('admin.edit', res);
                }
            }
        }
    }]);