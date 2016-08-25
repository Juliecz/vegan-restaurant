//angular.module('admin', ['ui.router', 'ngRoute'])
angular.module('veganapp.admin')
    .controller('dailyMenuCtrl', ['$scope', '$state', '$stateParams', '$window', 'dailyMenuFactory', function($scope, $state, $stateParams, $window, dailyMenuFactory) {
        $scope.day=['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];
        $scope.dayObj = [];

        if ($stateParams.activeTab === null ) {
            $scope.activeTab = 'pondeli';
        }
        else {
            $scope.activeTab = $stateParams.activeTab;
        }
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
        dailyMenuFactory.getDay().success(function (data, status) {
            $scope.datum = data;
            console.log('Status getday: ', status);
        });
        dailyMenuFactory.getDailyMenu().success(function (data, status) {
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
        dailyMenuFactory.getSort().success(function (data, status) {
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
                dailyMenuFactory.getById(id)
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
                dailyMenuFactory.removeFood(res.id);
                dailyMenuFactory.getDailyMenu().success(function (data, status) {
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
        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
        };

}]);