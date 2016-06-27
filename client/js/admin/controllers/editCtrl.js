angular.module('veganapp.admin')
    .controller('editCtrl', ['$scope', '$state', '$stateParams', 'getMenu', 'dailyMenuAdmin', 'drinkMenu', function ($scope, $state, $stateParams, getMenu, dailyMenuAdmin, drinkMenu) {
        $scope.typMenu = ['Staly jídelní lístek', 'Polední menu', 'Nápojový lístek'];
        $scope.typMenuId = ['menu', 'daily', 'drink'];
        $scope.stateTypMenu = $stateParams.menuType;
        $scope.typMenuSelected = $stateParams.action;
        switch ($stateParams.menuType) {
            case 'menu':
            {
                if ($stateParams.action == 'new') {
                    $scope.action = 'Přidat nové jídlo do jídelního lístku';
                }
                else if($stateParams.action == 'edit') {
                    $scope.action = 'Upravit jídlo';
                }
                break;
            }
            case 'daily':
            {
                if ($stateParams.action == 'new') {
                    $scope.action = 'Přidat nové jídlo do poledního menu';
                }
                else if($stateParams.action == 'edit') {
                    $scope.action = 'Upravit jídlo v poledním menu';
                }
                break;
            }
            case 'drink':
            {
                if ($stateParams.action == 'new') {
                    $scope.action = 'Přidat nový nápoj';
                }
                else if($stateParams.action == 'edit') {
                    $scope.action = 'Upravit nápoj';
                }
                break;
            }
            default:
            {
                $state.go('admin.menu');
            }
        }
        dailyMenuAdmin.getDay().success(function (data, status) {
            $scope.den = data;
        });
        getMenu.getFood().success(function (data, status) {
            $scope.dataMenu = data;
            console.log(status);
            console.log($scope.dataMenu);
        });
        getMenu.getSort().success(function (data) {
            $scope.trida = data;
        });
        getMenu.getTyp().success(function (data) {
            $scope.typ = data;
        });
        drinkMenu.getSort().success(function (data) {
            $scope.sortDrink = data;
        });
        //_________________
        if($stateParams.action == 'edit') {
            if ($stateParams.menuType == 'daily' || $stateParams.menuType == 'menu') {
                $scope.formData = {
                    jmeno: $stateParams.object.foodName,
                    popis: $stateParams.object.foodDescription,
                    typ: $stateParams.object.foodType,
                    trida: $stateParams.object.foodSort,
                    cena: $stateParams.object.price
                };
                if ($stateParams.menuType == 'menu') {
                    $scope.formData.typMenu = $scope.typMenu[0];
                }
                else if ($stateParams.menuType == 'daily') {
                    $scope.formData.typMenu = $scope.typMenu[1];
                    $scope.formData.den = $stateParams.object.day;
                }
            }
            else {
                drinkMenu.getById($stateParams.id).success(function (data) {
                    $scope.formData = {
                        jmeno: data.drinkName,
                        popis: data.drinkDescription,
                        trida: data.drinkSort,
                        cena: data.price,
                        typMenu: $scope.typMenu[2]
                    }
                });
            }
        }
        else if ($stateParams.action == 'new') {
            $scope.formData = {
                jmeno: '',
                popis:  '',
                typ: '',
                trida: '',
                cena: ''
            };
            if ($stateParams.menuType == 'menu') {
                $scope.formData.typMenu = $scope.typMenu[0];
            }
            else if ($stateParams.menuType == 'daily') {
                $scope.formData.typMenu = $scope.typMenu[1];
                $scope.formData.den = $stateParams.day;
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
                    cena: $scope.formData.cena,
                    den: $scope.formData.den
                };
                $scope.createFood(data);
                //$state.go('admin.menu');
            }
            else if($stateParams.action == 'edit') {
                    data = {
                    jmeno: $scope.formData.jmeno,
                    popis: $scope.formData.popis,
                    typ: $scope.formData.typ,
                    trida: $scope.formData.trida,
                    cena: $scope.formData.cena,
                    den: $scope.formData.den
                    };
                $scope.editFood(data);
            }
        };



        $scope.createFood = function (formData) {
            if(formData) {
                console.log($stateParams.menuType);
                switch ($stateParams.menuType) {
                    case 'menu':
                    {
                        getMenu.createFood(formData).success(function (err) {
                            console.log(err);
                        });
                        $state.go('admin.menu');
                        break;
                    }
                    case 'daily':
                    {
                        dailyMenuAdmin.createFood(formData).success(function (err) {
                            console.log(err);
                        });
                        //todo send activetab current day
                        $state.go('admin.dailyMenu');
                        break;
                    }
                    case 'drink':
                    {
                        drinkMenu.createDrink(formData).success(function (err) {
                            console.log(err);
                        });
                        //todo send activetab
                        $state.go('admin.menu');
                        break;
                    }
                }

            }
        };
        $scope.editFood = function (formData) {
            if(formData) {
                switch ($stateParams.menuType) {
                    case 'menu':
                    {
                        getMenu.updateFood($stateParams.id, formData).success(function (err) {
                            console.log(err);
                        });
                        $state.go('admin.menu');
                        break;
                    }
                    case 'daily':
                    {
                        console.log(formData);
                        dailyMenuAdmin.editFood(formData, $stateParams.id).success(function (err) {
                            console.log(err);
                        });
                        //todo send activetab current day
                        $state.go('admin.dailyMenu');
                        break;
                    }
                    case 'drink':
                    {
                        drinkMenu.updateDrink(formData, $stateParams.id).success(function (err) {
                            console.log(err);
                        });
                        //todo send activetab
                        $state.go('admin.menu');
                        break;
                    }
                }
            }
        };
}]);