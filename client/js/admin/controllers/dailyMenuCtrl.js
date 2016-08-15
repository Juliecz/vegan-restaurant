//angular.module('admin', ['ui.router', 'ngRoute'])
angular.module('veganapp.admin')
    .controller('dailyMenuCtrl', ['$scope', '$state', '$stateParams', '$window', 'dailyMenuAdmin', function($scope, $state, $stateParams, $window, dailyMenuAdmin) {
        $scope.day=['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];
        $scope.dayObj = [];
        //send action to edit
        $scope.activeTab = 'pondeli';
        $scope.actions = {
            new: 'Pridat nove jidlo',
            edit: 'Upravit jidlo'
        };
        $scope.days = [
            {
                id: 'pondeli',
                name: 'Pondělí'
            },
            {
                id: 'utery',
                name: 'Úterý'
            },
            {
                id: 'streda',
                name: 'Středa'
            },
            {
                id: 'ctvrtek',
                name: 'Čtvrtek'
            },
            {
                id: 'patek',
                name: 'Pátek'
            }
        ];
        //_______________________
        dailyMenuAdmin.getDay().success(function (data, status) {
            $scope.datum = data;
            console.log('Status getday: ', status);
        });
        dailyMenuAdmin.getDailyMenu().success(function (data, status) {
            $scope.data = data;
            if($scope.data) {
                if($scope.datum) {
                    for (var i=0; i<$scope.day.length; i++) {
                        $scope.dayObj.push({
                            name: $scope.datum[i],
                            text: $scope.day[i]
                        });
                    }
                    console.log('Day arr object', $scope.dayObj);
                }
            }
        });
        dailyMenuAdmin.getSort().success(function (data, status) {
            $scope.typ = data;
            console.log('Typ: ', $scope.typ);
        });

        $scope.setAction = function (action, id) {
            $stateParams.action = action;
            $stateParams.id = id;
            var res={};
            if($stateParams.action == 'new') {
                res = {
                    action: $stateParams.action,
                    actionName: $scope.actions.new,
                    id: id,
                    object: {},
                    menuType: 'daily',
                    day: $scope.activeTab
                };
                $stateParams.actionName = $scope.actions.new;
                $state.go('admin.edit', res);
            }
            else if($stateParams.action == 'edit') {
                /*for (var i = 0; i < $scope.data.length; i++) {
                    if ($scope.data[i]._id == $stateParams.id) {
                        $scope.editFoodObj = $scope.dataMenu[i];
                        break;
                    }
                }*/
                dailyMenuAdmin.getById(id)
                    .success(function (data, status) {
                        res = {
                            action: $stateParams.action,
                            actionName: $scope.actions.edit,
                            id: id,
                            object: data,
                            menuType: 'daily'
                        };
                        $state.go('admin.edit/:id', res);
                    });
            }
            else if($stateParams.action == 'delete') {
                res = {
                    action: $stateParams.action,
                    actionName: 'delete',
                    id: $stateParams.id
                };
                dailyMenuAdmin.removeFood(res.id);
                dailyMenuAdmin.getDailyMenu().success(function (data, status) {
                    $scope.data = data;
                    if($scope.data) {
                        if($scope.datum) {
                            for (var i=0; i<$scope.day.length; i++) {
                                $scope.dayObj.push({
                                    name: $scope.datum[i],
                                    text: $scope.day[i]
                                });
                            }
                            console.log('Day arr object', $scope.dayObj);
                        }
                    }
                });
            }
            console.log(res);
        };
        $scope.activeTab = 'pondeli';
        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
        };

}]);