/**
 * Created by yuliya on 13.4.16.
 */
angular.module('veganapp')
    .factory('getTable', function ($http) {
    return {
        getTables: function () {
            return $http.get('/api/table')
                .success(function (data) {
                    this.jsonTables = data;
                });
        },
        getTableById: function (id) {
            return $http.get('/api/table/'+id)
                .success(function (data) {
                    this.jsonTables = data;
                });
        }
    };
});