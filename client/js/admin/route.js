
var routeAppAdmin = angular.module('admin', ['ui.router', 'ngRoute']);
routeAppAdmin.config(['$stateProvider', '$urlRouterProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $httpProvider) {
    var checkLogin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/logged').success(function (user) {
            if(user !== '0') {
                //TODO console comment 2
                console.log('zprava: login is ok');
                deferred.resolve();
            }
            else {
                console.log('zprava: login is not ok');
                $rootScope.message  = 'You need to log in';
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
    //TODO ?????
    /*$httpProvider.interceptors.push(function ($q, $location) {
        return {
            response: function (res) {
                /*if(res.config.method == 'GET' && res.config.url.split('.').pop() == 'html') {
                    return res;
                }*
                console.log(res.object);
                return res.data;
            },
            responseError: function (res) {
                return $q.reject(res);//$q.reject(rejection);
            }
        };
    });*/

    $urlRouterProvider.otherwise('public/home');
    $stateProvider
        .state('admin', {
            abstract: true,
            name: 'admin',
            url: '/admin',
            views: {
                'main': { templateUrl: '/views/admin/content.html'}//'<div ui-view="public"></div>' }
            }/*,
            resolve: {
                logged: checkLogin
            }*/
        })
        .state('admin.home', {
            parent: 'admin',
            url: '/home',
            views: {
                'admin' : { templateUrl: '/views/admin/home.html' }
            },
            templateUrl: '/views/admin/home.html',
            controller: 'homeCtrl'
        })
        .state('admin.users', {
            url: '/users',
            views: {
                'admin' : { templateUrl: '/views/admin/users.html' }
            }
        })
        .state('admin.menu', {
            url: '/menu',
            views: {
                'admin' : { templateUrl: '/views/admin/menu.html' }
            },
            controller: 'menuCtrl'
        })
        .state('admin.dailyMenu', {
            url: '/dailyMenu',
            views: {
                'admin' : { templateUrl: '/views/admin/dailyMenu.html' }
            },
            controller: 'dailyMenuCtrl'
        })
        .state('admin.reservation', {
            url: '/reservation',
            views: {
                'admin' : { templateUrl: '/views/admin/reservation.html' }
            },
            controller: 'reservationCtrl'
        })
        .state('admin.edit', {
            url: '/edit',
            views: {
                'admin' : { templateUrl: '/views/admin/edit.html' }
            },
            params: {
                'action': null,
                'actionName': null,
                'id': null,
                'object': {},
                'menuType': null
            },
            controller: 'editCtrl'
        })
        .state('admin.edit/:id', {
            url: '/edit/:id',
            views: {
                'admin' : { templateUrl: '/views/admin/edit.html' }
            },
            params: {
                'action': null,
                'actionName': null,
                'id': null,
                'object': {},
                'menuType': null,
            },
            controller: 'editCtrl'
        })
        .state('login', {
            url: '/login',
            views: {
                'main' : { templateUrl: '/views/admin/login.html' }
            },
            controller: 'loginCtrl'
        });
}]);
routeAppAdmin.run(['$state', '$location', 'authProvider', function ($state, $location, authProvider) {
    if (!authProvider.isLogged()) {
        console.log('User is not authenticated');
    } 
    $state.go('admin.home');
}]);
