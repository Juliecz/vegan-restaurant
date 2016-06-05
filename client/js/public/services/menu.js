/**
 * Created by yuliya on 14.4.16.
 */
angular.module('veganapp.public')
    .factory('menuPublic', function ($http) {
    return {
        getMenu: function () {
            return $http.get('/api/menu')
                .success(function (data) {
                    this.jsonMenu = data;
                });
        },
        getSort: function () {
            return $http.get('/api/menu/sort')
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        getDailyMenu: function () {
            return $http.get('/api/dailymenu')
                .success(function (data) {
                    this.jsonData = data;
                });
        }
    };
});