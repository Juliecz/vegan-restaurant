
/*'use strict';

app.factory("Menu", function($resource, $http) {
    var resource = $resource("/admin/:id", { id: "@_id" },
        {
            'create':  { method: 'POST' },
            'index':   { method: 'GET', isArray: true },
            'show':    { method: 'GET', isArray: false },
            'update':  { method: 'PUT' },
            'destroy': { method: 'DELETE' }
        }
    );

    return resource;
});*/