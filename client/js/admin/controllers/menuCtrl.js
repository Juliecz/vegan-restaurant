angular.module('veganapp.admin')
    .controller('menuCtrl', ['$scope', '$state', '$stateParams', 'menuFactory', 'drinkMenu', 'userFactory', 'authProvider', function($scope, $state, $stateParams, menuFactory, drinkMenu, userFactory, authProvider){
        authProvider.isLoggedIn()
            .then(function (data) {
                userFactory.getUserById(data.data)
                    .success(function (data) {
                        $scope.me = data;
                    });
            });
        if ($stateParams.activeTab === null) {
            $scope.activeTab = 'jidelni';
        }
        else {
            $scope.activeTab = $stateParams.activeTab;
        }
        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
            if ($scope.activeTab == 'jidelni') {
                $scope.actions = {
                    new: 'Přidat nové jídlo',
                    edit: 'Upravit jídlo'
                };
            }
            else {
                $scope.actions = {
                    new: 'Přidat nový nápoj',
                    edit: 'Upravit nápoj'
                };
            }
        };

        //send action to edit
        if ($scope.activeTab == 'jidelni') {
            $scope.actions = {
                new: 'Přidat nové jídlo',
                edit: 'Upravit jídlo'
            };
        }
        else {
            $scope.actions = {
                new: 'Přidat nový nápoj',
                edit: 'Upravit nápoj'
            };
        }
        //_______________________
    
    
        //database
        $scope.dataMenu = {};
        $scope.typ = {};
        $scope.trida = {};
        $scope.tridaVar = [];
        menuFactory.getFood().success(function (data, status) {
                $scope.dataMenu = data;
            });
        menuFactory.getTyp().success(function (data, status) {
                $scope.typ = data;
                //console.log($scope.typ);
            });
        menuFactory.getSort().success(function (data, status) {
                $scope.trida = data;
                //console.log($scope.trida);
                if ($scope.trida) {
                    for (var i = 0; i < $scope.trida.length; i++) {
                        //console.log(i);
                        if ($scope.trida[i] == 'predkrm') {
                            $scope.tridaVar.push({
                                name: 'predkrm',
                                text: 'Předkrmy'
                            });
                        }
                        else if ($scope.trida[i] == 'hlavni') {
                            $scope.tridaVar.push({
                                name: 'hlavni',
                                text: 'Hlavní chody'
                            });
                        }
                        else if ($scope.trida[i] == 'salat') {
                            $scope.tridaVar.push({
                                name: 'salat',
                                text: 'Saláty'
                            });
    
                        }
                        else if ($scope.trida[i] == 'dezert') {
                            $scope.tridaVar.push({
                                name: 'dezert',
                                text: 'Dezerty'
                            });
                        }
                    }
                }
            });
        drinkMenu.getDrinks().success(function (data) {
            $scope.drinks = data;
        });
        drinkMenu.getSort().success(function (data) {
            $scope.sortD = data;
        });
        //________________________
        

        $scope.setAction = function (action, id, menutype) {
            $stateParams.action = action;
            $stateParams.id = id;
            var res={};
            if($stateParams.action == 'new') {
                res = {
                    action: $stateParams.action,
                    actionName: $scope.actions.new,
                    id: $stateParams.id,
                    object: {},
                    menuType: menutype
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
                    menuType: menutype
                };
                $state.go('admin.edit/:id', res);
            }
            else if($stateParams.action == 'delete') {
                if (menutype === 'menu') {
                    res = {
                        action: $stateParams.action,
                        actionName: 'delete',
                        id: $stateParams.id
                    };
                    menuFactory.removeFood(res.id);
                    menuFactory.getFood().success(function (data, status) {
                        $scope.dataMenu = data;
                    });
                }
                else if(menutype == 'drink') {
                    drinkMenu.removeDrink(id);
                    drinkMenu.getDrinks().success(function (data) {
                        $scope.drinks = data;
                    });
                }
            }
            //console.log(res);
        };
    }]);