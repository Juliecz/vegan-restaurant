angular.module('veganapp')
    .factory('tablesFactory', function ($http) {
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