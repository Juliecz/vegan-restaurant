angular.module('veganapp.admin')
    .factory('dailyMenuAdmin', function ($http) {
    return {
        getDailyMenu: function () {
            return $http.get('/api/dailymenu')
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        getDay: function () {
            return $http.get('/api/dailymenu/day')
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        getType: function () {
            return $http.get('/api/dailymenu/type')
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        getSort: function () {
            return $http.get('/api/dailymenu/sort')
                .success(function (data) {
                    this.jsonData = data;
                });
        }
    };
});