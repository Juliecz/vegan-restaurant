//angular.module('admin', ['ui.router', 'ngRoute'])
angular.module('veganapp.admin')
    .controller('dailyMenuCtrl', ['$scope', '$state', '$stateParams', 'dailyMenuAdmin', function($scope, $state, $stateParams, dailyMenuAdmin) {
    $scope.day=['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];
    $scope.dayObj = [];
    //send action to edit
    $scope.actions = {
        new: 'Pridat nove jidlo',
        edit: 'Upravit jidlo'
    };
    //_______________________
    dailyMenuAdmin.getDay().success(function (data, status) {
        $scope.datum = data;
        console.log('Status getday: ', status);
    });
    dailyMenuAdmin.getDailyMenu().success(function (data, status) {
        $scope.data = data;
        console.log(data);
        console.log(status);
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
                id: $stateParams.id,
                object: {},
                menuType: 'daily'
            };
            $stateParams.actionName = $scope.actions.new;
            $state.go('admin.edit', res);
        }
        else if($stateParams.action == 'edit') {
            for (var i = 0; i < $scope.data.length; i++) {
                if ($scope.data[i]._id == $stateParams.id) {
                    $scope.editFoodObj = $scope.dataMenu[i];
                    break;
                }
            }
            res = {
                action: $stateParams.action,
                actionName: $scope.actions.edit,
                id: $stateParams.id,
                object: $scope.editFoodObj,
                menuType: 'daily'
            };
            console.log(res);
            //$state.go('admin.edit/:id', res);
        }
        else if($stateParams.action == 'delete') {
            /*res = {
                action: $stateParams.action,
                actionName: 'delete',
                id: $stateParams.id
            };
            getMenu.removeFood(res.id);
            getMenu.getFood().success(function (data, status) {
                $scope.dataMenu = data;
                console.log(status);
                console.log($scope.dataMenu);
            });*/
        }
        console.log(res);
    };

}]);