angular.module('veganapp.admin')
    .controller('menuCtrl', ['$scope', '$state', '$stateParams', 'getMenu', function($scope, $state, $stateParams, getMenu){
    //send action to edit
    $scope.actions = {
        new: 'Pridat nove jidlo',
        edit: 'Upravit jidlo'
    };
    //_______________________


    //database
    $scope.dataMenu = {};
    $scope.typ = {};
    $scope.trida = {};
    getMenu.getFood().success(function (data, status) {
            $scope.dataMenu = data;
            console.log(status);
            console.log($scope.dataMenu);
        });
    getMenu.getTyp().success(function (data, status) {
            $scope.typ = data;
            console.log($scope.typ);
        });
    getMenu.getSort().success(function (data, status) {
            $scope.trida = data;
            console.log($scope.trida);
        });
    //________________________

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
                menuType: 'menu'
            };
            $stateParams.actionName = $scope.actions.new;
            $state.go('admin.edit', res);
        }
        else if($stateParams.action == 'edit') {
            for (var i = 0; i < $scope.dataMenu.length; i++) {
                if ($scope.dataMenu[i]._id == $stateParams.id) {
                    $scope.editFoodObj = $scope.dataMenu[i];
                    break;
                }
            }
            res = {
                action: $stateParams.action,
                actionName: $scope.actions.edit,
                id: $stateParams.id,
                object: $scope.editFoodObj,
                menuType: 'menu'
            };
            $state.go('admin.edit/:id', res);
        }
        else if($stateParams.action == 'delete') {
            res = {
                action: $stateParams.action,
                actionName: 'delete',
                id: $stateParams.id
            };
            getMenu.removeFood(res.id);
            getMenu.getFood().success(function (data, status) {
                $scope.dataMenu = data;
                console.log(status);
                console.log($scope.dataMenu);
            });
        }
        console.log(res);
    };
    /*$scope.editFood = function (id) {

        var res = {
            action: 'edit',
            actionName: 'Upravit jidlo',
            id: id
        };
        console.log(res);
        if(!res.delete) {
            $state.go('admin.edit/:id', res);
        }
        else {
            getMenu.removeFood(res.id);
            getMenu.getFood().success(function (data, status) {
                $scope.dataMenu = data;
                console.log(status);
                console.log($scope.dataMenu);
            });
        }
    }*/
}]);