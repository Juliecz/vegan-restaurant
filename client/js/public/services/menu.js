/**
 * Created by yuliya on 14.4.16.
 */
routeApp.factory('menuPublic', function ($http) {
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
        }
    };
});