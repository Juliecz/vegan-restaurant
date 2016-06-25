angular.module('veganapp.admin')
    .controller('editCtrl', ['$scope', '$state', '$stateParams', 'getMenu', 'dailyMenuAdmin', function ($scope, $state, $stateParams, getMenu, dailyMenuAdmin) {
        $scope.typMenu = ['Staly jídelní lístek', 'Polední menu', 'Nápojový lístek'];
        $scope.stateTypMenu = $stateParams.menuType;
        console.log($stateParams.menuType);
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
        if ($stateParams.action === null) {
            //previous state
            $state.go('admin.menu');
        }
        else if($stateParams.action == 'edit') {
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
            else if ($stateParams.menuType == 'daily') {
                $scope.formData.typMenu = $scope.typMenu[1]; 
            }
            else { $scope.formData.typMenu = $scope.typMenu[2];}
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
                getMenu.createFood(formData).success();
            }
        };
        $scope.editFood = function (formData) {
            if(formData) {
                getMenu.updateFood($stateParams.id, formData).success();
            }
        };
}]);