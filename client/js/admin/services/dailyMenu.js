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
        },
        getById: function (id) {
            return $http.get('/api/dailymenu/id/'+id)
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        createFood: function (formData) {
            return $http.post('/api/dailymenu', {foodName: formData.jmeno, foodDescription: formData.popis, foodType:formData.typ, foodSort:formData.trida, price: formData.cena, day: formData.den} );
        },
        editFood: function (formData, id) {
            return $http.put('/api/dailymenu/'+id, {foodName: formData.jmeno, foodDescription: formData.popis, foodType:formData.typ, foodSort:formData.trida, price: formData.cena, day: formData.den});
        }
    };
});