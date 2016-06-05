//'use strict';

//todo var routeAppAdmin = angular.module('admin', ['ui.router', 'ngRoute']);
angular.module('veganapp.admin')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    'main': { 
                        templateUrl: '/views/admin/content.html',
                        controller: 'headCtrlA'
                    }
                },
                resolve: {
                    loggedInResolve: function (authProvider, $state) {
                        authProvider.isLoggedIn()
                            .then(function (data) {
                                if(data.data !== '' && data.data !== '0' ) {
                                    $state.go('admin.home');
                                }
                                else {
                                    $state.go('login');
                                }
                            }, function () {
                                $state.go('login');
                            });
                    }
                },
                abstact: true
            })
            .state('admin.home', {
                url: '/home',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/home.html',
                        controller: 'homeCtrlA'
                    }
                }
            })
            .state('admin.user', {
                url: '/user',
                views: {
                    'admin' : {
                        templateUrl: '/views/admin/user.html',
                        controller: 'userCtrl'
                    }
                }
            })
            .state('admin.users', {
                url: '/users',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/users.html',
                        controller: 'usersCtrl'
                    }
                }
            })
            .state('admin.menu', {
                url: '/menu',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/menu.html',
                        controller: 'menuCtrl'
                    }
                }
            })
            .state('admin.dailyMenu', {
                url: '/dailyMenu',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/dailyMenu.html',
                        controller: 'dailyMenuCtrl'
                    }
                }
            })
            .state('admin.reservation', {
                url: '/reservation',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/reservation.html',
                        controller: 'reservationCtrl'
                    }
                }
            })
            .state('admin.edit', {
                url: '/edit',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/edit.html',
                        controller: 'editCtrl'
                    }
                },
                params: {
                    'action': null,
                    'actionName': null,
                    'id': null,
                    'object': {},
                    'menuType': null
                }
            })
            .state('admin.edit/:id', {
                url: '/edit/:id',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/edit.html',
                        controller: 'editCtrl'
                    }
                },
                params: {
                    'action': null,
                    'actionName': null,
                    'id': null,
                    'object': {},
                    'menuType': null
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'main' : { 
                        templateUrl: '/views/admin/login.html',
                        controller: 'loginCtrl'
                    }
                },
                resolve: {
                    loggedInResolve: function (authProvider, $state) {
                        authProvider.isLoggedIn()
                            .then(function (data) {
                                console.log('resolve is running: ', data.data);
                                if(data.data !== '' && data.data !== '0' ) {
                                    $state.go('admin.home');
                                }
                                else {
                                    $state.go('login');
                                }
                            }, function () {
                                $state.go('login');
                            });
                    }
                }
            });
    }])
    .run(['$state', '$rootScope', '$location', 'authProvider', function ($state, $rootScope, $location, authProvider) {
    /*if (!authProvider.isLogged()) {
        console.log('User is not authenticated');
    } */
    //$state.go('admin.home');
        /*$rootScope.$on('$routeChangeStart', function () {
            /*var b = authProvider.isLoggedIn();
            if (b === false) {
                $location.url('/login');
            }*
            authProvider.isLoggedIn()
                .then(function () {
                    $location.url('/admin/home');
                })
                .catch(function () {
                    $location.url('/login');
                });
        });*/
    }])
    .controller('headCtrlA', ['$scope', '$state', '$stateParams', '$location', 'authProvider', function ($scope, $state, $stateParams, $location, authProvider) {
        
        $scope.logout = function () {
            authProvider.logout()
                .then(function () {
                    //todo nutne!!!
                    $location.url('/home');
                });
        };
    }]);
