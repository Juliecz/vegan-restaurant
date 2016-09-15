angular.module('veganapp.admin')
    .factory('authProvider', ['$q', '$timeout', '$http', '$location', function ($q, $timeout, $http, $location) {
        var user = null;
        return ({
            login: function (username, password) {
                return $http.post('/api/login', { username: username, password: password})
                    .success(function (data, status) {
                        return data;
                    })
                    .error(function () {
                        return 0;
                    });
            },
            isLoggedIn: function () {
                return $http.get('/api/logged')
                    .success(function (data, status) {
                        return data;
                    })
                    .error(function () {
                        return 0;
                    });
            },
            logout: function () {
                return $http.get('/api/logout')
                    .success(function (data, status) {
                        return data;
                    })
                    .error(function () {
                        return 0;
                    });
            }
        });
    }]);