/**
 * Created by yuliya on 13.4.16.
 */
routeApp.factory('getTable', function ($http) {
    return {
        getTables: function () {
            return $http.get('/api/table')
                .success(function (data) {
                    this.jsonTables = data;
                });
        }
    };
});