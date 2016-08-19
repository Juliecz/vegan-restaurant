
//todo var routeApp = angular.module('public', ['ui.router', 'ui.bootstrap']);
//angular.module('veganapp.public', ['veganapp.system']);
angular.module('veganapp.public')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('public', {
                url: '',
                views: {
                    'main': {
                        templateUrl: '/views/public/content.html',
                        controller: 'headCtrlP'
                    }
                },
                abstract: true
            })
            .state('public.home', {
                url: '/home',
                views: {
                    'public': {
                        templateUrl: '/views/public/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })
            .state('public.menu', {
                url: '/menu',
                views: {
                    'public' : { 
                        templateUrl: '/views/public/menu.html',
                        controller: 'menuCtrlP'
                    }
                }
            })
            .state('public.contact', {
                url: '/contact',
                views: {
                    'public' : {
                        templateUrl: '/views/public/contact.html',
                        controller: 'contactCtrl'
                    }
                }
            })
            .state('public.reservation', {
                url: '/reservation',
                views: {
                    'public' : { 
                        templateUrl: '/views/public/tables.html',
                        controller: 'tablesCtrl'
                    }
                }
            });
    }])
    .run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$state = $state;
        $state.go('public.home');
    }]);
//TODO remove the contorller
angular.module('veganapp.public')   
    .controller('headCtrlP', ['$scope', '$http', '$rootScope', '$window', function($scope, $http, $rootScope, $window) {
        /*$scope.$on('$locationChangeStart', function() {

        });*
        $scope.setLink = function () {
            console.log('ahoj');
            /*$scope.set = $http.get('/api/logged')
                .success(function (data) {
                    /*if(data) {
                        console.log('SET LINK!!!!!!!!!!!!!!!!');
                        return '/#/admin/home';
                    }
                    else {
                        return '/#/login';
                    }*
                    return data;
                })
                .error(function () {
                    return '/#/login';
                });*
        };*/
        
    /*$(window).scroll(function(){
     if ($(this).scrollTop()>150) {
     $('.navbar').addClass('navbar-fixed-top');
     $('li:hidden').show('fast');
     }
     else {
     $('.navbar').removeClass('navbar-fixed-top');
     $('li:last').hide();
     }
     });*/
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
}]);
    