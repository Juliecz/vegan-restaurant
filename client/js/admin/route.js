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
                    loggedInResolve: function (authProvider, $state, $rootScope) {
                        authProvider.isLoggedIn()
                            .then(function (data) {
                                if(data.data !== '' && data.data !== '401' ) {
                                    if ($rootScope.$state.current.name === 'admin') {
                                        $state.go('admin.home');
                                    }
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
                },
                params: {
                    activeTab: null
                }
            })
            .state('admin.dailyMenu', {
                url: '/dailyMenu',
                views: {
                    'admin' : { 
                        templateUrl: '/views/admin/dailyMenu.html',
                        controller: 'dailyMenuCtrl'
                    }
                },
                params: {
                    activeTab: null
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
                    'menuType': null,
                    'day': null
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
                                //console.log('resolve is running: ', data.data);
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
        //console.log('state go');
        //$state.go('admin.home');
    }])
    .controller('headCtrlA', ['$scope', '$state', '$stateParams', '$location', '$window','$document', 'authProvider', 'userFactory', function ($scope, $state, $stateParams, $location, $window, $document, authProvider, userFactory) {
        $scope.c = 'home';
        $scope.logout = function () {
            authProvider.logout()
                .then(function () {
                    $location.url('/home');
                });
        };
        authProvider.isLoggedIn()
            .then(function (data) {
                userFactory.getUserById(data.data)
                    .success(function (data) {
                        $scope.uzivatel = data;
                    });
            });
        $scope.winSize = $window.innerWidth;
        $scope.resizeWin = function () {
            if ($window.innerWidth < 768) {
                $scope.showLeftMenu = false;
                $scope.classSmallScreen = 'smallScreen';
            }
            else {
                $scope.showLeftMenu = true;
                $scope.classSmallScreen = '';
            }
        };
        $scope.resizeWin();
        $(window).resize(function () {
            $scope.$apply(function () {
                $scope.resizeWin();
                $scope.winSize = $window.innerWidth;
            });
        });
        $scope.showHideLeftMenu = function () {
            if ($window.innerWidth <768) {
                if ($scope.showLeftMenu) {
                    $scope.showLeftMenu = false;
                }
                else {
                    $scope.showLeftMenu = true;
                }

                if ($scope.classSmallScreen === 'smallScreen') {
                    $scope.classSmallScreen = '';
                }
                else {
                    $scope.classSmallScreen = 'smallScreen';
                }
            }
        };
        $scope.clickSection = function () {
            if ($window.innerWidth < 768) {
                $scope.showLeftMenu = false;
                $scope.classSmallScreen = 'smallScreen';
            }
        };
    }]);
