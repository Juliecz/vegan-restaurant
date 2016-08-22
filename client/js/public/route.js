
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
        /*$scope.getWatchers = function(root) {
            root = angular.element(root || document.documentElement);
            var watcherCount = 0;

            function getElemWatchers(element) {
                var isolateWatchers = getWatchersFromScope(element.data().$isolateScope);
                var scopeWatchers = getWatchersFromScope(element.data().$scope);
                var watchers = scopeWatchers.concat(isolateWatchers);
                angular.forEach(element.children(), function (childElement) {
                    watchers = watchers.concat(getElemWatchers(angular.element(childElement)));
                });
                return watchers;
            }

            function getWatchersFromScope(scope) {
                if (scope) {
                    return scope.$$watchers || [];
                } else {
                    return [];
                }
            }

            return getElemWatchers(root);
        };
        console.log('watchers ', $scope.getWatchers().length);
        */
        //TODO visitors ????
        (function () {
            var root = angular.element(document.getElementsByTagName('body'));

            var watchers = [];

            var f = function (element) {
                angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
                    if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                        angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                            watchers.push(watcher);
                        });
                    }
                });

                angular.forEach(element.children(), function (childElement) {
                    f(angular.element(childElement));
                });
            };

            f(root);

            // Remove duplicate watchers
            var watchersWithoutDuplicates = [];
            angular.forEach(watchers, function(item) {
                if(watchersWithoutDuplicates.indexOf(item) < 0) {
                    watchersWithoutDuplicates.push(item);
                }
            });

            console.log(watchersWithoutDuplicates.length);
        })();

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


