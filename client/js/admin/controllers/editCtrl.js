angular.module('veganapp.admin')
    .controller('editCtrl', ['$scope', '$state', '$stateParams', 'menuFactory', 'dailyMenuFactory', 'drinkMenu', 'userFactory', function ($scope, $state, $stateParams, menuFactory, dailyMenuFactory, drinkMenu, userFactory) {
        $scope.typMenu = ['Staly jídelní lístek', 'Polední menu', 'Nápojový lístek'];
        $scope.typMenuId = ['menu', 'daily', 'drink', 'user'];
        $scope.role = ['admin', 'employee'];
        //$scope.stateTypMenu = $stateParams.menuType;
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
            case 'user':
            {
                if ($stateParams.action == 'new') {
                    $scope.action = 'Nový uživatel';
                }
                else if ($stateParams.action == 'edit') {
                    $scope.action = 'Úprava osobních údajů';
                }
                break;
            }
            default:
            {
                $state.go('admin.menu');
            }
        }
        dailyMenuFactory.getDay().success(function (data, status) {
            $scope.den = data;
        });
        menuFactory.getFood().success(function (data, status) {
            $scope.dataMenu = data;
            console.log(status);
            console.log($scope.dataMenu);
        });
        menuFactory.getSort().success(function (data) {
            $scope.trida = data;
        });
        menuFactory.getTyp().success(function (data) {
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
                    $scope.formData.typMenu = $scope.typMenuId[0];
                }
                else if ($stateParams.menuType == 'daily') {
                    $scope.formData.typMenu = $scope.typMenuId[1];
                    $scope.formData.den = $stateParams.object.day;
                }
            }
            else if ($stateParams.menuType == 'drink') {
                drinkMenu.getById($stateParams.id).success(function (data) {
                    $scope.formData = {
                        jmeno: data.drinkName,
                        popis: data.drinkDescription,
                        trida: data.drinkSort,
                        cena: data.price,
                        typMenu: $scope.typMenuId[2],
                        objem: data.volume
                    };
                });
            }
            else if ($stateParams.menuType == 'user') {
                userFactory.getUserById($stateParams.id)
                    .success(function (data) {
                        $scope.formData = {
                            uzivJm: data.username,
                            jm: data.name,
                            prijm: data.surname,
                            role: data.role,
                            phone: data.phone,
                            email: data.email,
                            typMenu: 'user'
                        };
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
                $scope.formData.typMenu = $scope.typMenuId[0];
            }
            else if ($stateParams.menuType == 'daily') {
                $scope.formData.typMenu = $scope.typMenuId[1];
                $scope.formData.den = $stateParams.day;
            }
            else if ($stateParams.menuType == 'drink' )
            { $scope.formData.typMenu = $scope.typMenuId[2];}
            else if($stateParams.menuType == 'user')
            { $scope.formData.typMenu = 'user'; }
        }

        $scope.sendPost = function () {
            if ($stateParams.action == 'new') {
                $scope.createFood($scope.formData);
            }
            else if ($stateParams.action == 'edit') {
                $scope.editFood($scope.formData);
            }
        };



        $scope.createFood = function (formData) {
            if(formData) {
                console.log($stateParams.menuType);
                switch ($stateParams.menuType) {
                    case 'menu':
                    {
                        menuFactory.createFood(formData).success(function (err) {
                            console.log(err);
                        });
                        $state.go('admin.menu', {activeTab: 'jidelni'});
                        break;
                    }
                    case 'daily':
                    {
                        dailyMenuFactory.createFood(formData).success(function (err) {
                            console.log(err);
                        });
                        $state.go('admin.dailyMenu', {activeTab: formData.den});
                        break;
                    }
                    case 'drink':
                    {
                        drinkMenu.createDrink(formData).success(function (err) {
                            console.log(err);
                        });
                        $state.go('admin.menu', {activeTab: 'napojovy'});
                        break;
                    }
                    case 'user':
                    {
                        userFactory.createUser(formData).success(function (err) {});
                        $state.go('admin.users');
                    }
                }

            }
        };
        $scope.editFood = function (formData) {
            if(formData) {
                switch ($stateParams.menuType) {
                    case 'menu':
                    {
                        menuFactory.updateFood($stateParams.id, formData).success(function (err) {
                            console.log(err);
                        });
                        $state.go('admin.menu', {activeTab: 'jidelni'});
                        break;
                    }
                    case 'daily':
                    {
                        console.log(formData);
                        dailyMenuFactory.editFood(formData, $stateParams.id).success(function (err) {
                            console.log(err);
                        });
                        $state.go('admin.dailyMenu', {activeTab: formData.den});
                        break;
                    }
                    case 'drink':
                    {
                        drinkMenu.updateDrink(formData, $stateParams.id).success(function (err) {});
                        $state.go('admin.menu', {activeTab: 'napojovy'});
                        break;
                    }
                    case 'user':
                    {
                        userFactory.updateUser($stateParams.id, formData).success(function (err) {});
                        $state.go('admin.users');
                    }
                }
            }
        };
}]);