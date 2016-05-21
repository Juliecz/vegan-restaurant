/**
 * Created by yuliya on 15.4.16.
 */
routeAppAdmin.controller('editCtrl', ['$scope', '$state', '$stateParams', 'getMenu', 'dailyMenuAdmin', function ($scope, $state, $stateParams, getMenu, dailyMenuAdmin) {

    $scope.typMenu = ['Staly jídelní lístek', 'Polední menu'];
    $scope.stateTypMenu = $stateParams.menuType;

    if(window.innerWidth < 800 && window.innerWidth > 600) {
        $scope.formWidth = 'width: 85%';
        $scope.divForm = 'width: 95%';
    }
    else if (window.innerWidth > 800) {
        $scope.formWidth='width: 60%';
        $scope.divForm = 'width: 80%';
    }
    else {
        $scope.formWidth = 'width: 100%';
        $scope.divForm = 'width: 100%';
    }
    dailyMenuAdmin.getDay().success(function (data, status) {
        $scope.den = data;
    });
    getMenu.getFood().success(function (data, status) {
        $scope.dataMenu = data;
        console.log(status);
        console.log($scope.dataMenu);
    });
    getMenu.getSort().success(function (data, status) {
        $scope.trida = data;
        //console.log(status);
    });
    getMenu.getTyp().success(function (data, status) {
        $scope.typ = data;
        //console.log(status);
    });
    $scope.action = $stateParams.actionName;
    /*console.log("State params to edit: ", $stateParams);
    if($stateParams.delete) {
        //remove from db
        getMenu.removeFood($stateParams.id);
        console.log('delete');
        //admin.menu or admin.dailyMenu
        //$state.go('admin.menu');
    };*/
    if ($stateParams.action === null) {
        //previous state
        $state.go('admin.menu');
    }
    else if($stateParams.action == 'edit') {
        console.log('action is edit');
        console.log($stateParams.menuType);
        console.log('Prvni: ', $scope.typMenu[0]);
        $scope.formData = {
            jmeno: $stateParams.object.foodName,
            popis:  $stateParams.object.foodDescription,
            typ: $stateParams.object.foodType,
            trida: $stateParams.object.foodSort,
            cena: $stateParams.object.price
        };
        if ($stateParams.menuType == 'menu') {
            $scope.formData.typMenu = $scope.typMenu[0];
        }
        else { $scope.formData.typMenu = $scope.typMenu[1]; }
    }

    $scope.sendPost = function () {
        var data = {};
        if($stateParams.action == 'new') {
                data = {
                jmeno: $scope.formData.jmeno,
                popis: $scope.formData.popis,
                typ: $scope.formData.typ,
                trida: $scope.formData.trida,
                cena: $scope.formData.cena
            };
            $scope.createFood(data);
            $state.go('admin.menu');
        }
        else if($stateParams.action == 'edit') {
                data = {
                jmeno: $scope.formData.jmeno,
                popis: $scope.formData.popis,
                typ: $scope.formData.typ,
                trida: $scope.formData.trida,
                cena: $scope.formData.cena
            };
            $scope.editFood(data);
            $state.go('admin.menu');
        }
    };



    $scope.createFood = function (formData) {
        if(formData) {
            getMenu.createFood(formData).success(function (data, status) {
                console.log(data);
                console.log(status);
            });
        }
    };
    $scope.editFood = function (formData) {
        if(formData) {
            getMenu.updateFood($stateParams.id, formData).success(function (data, status) {
                console.log(data);
                console.log(status);
            });
        }
    };
}]);