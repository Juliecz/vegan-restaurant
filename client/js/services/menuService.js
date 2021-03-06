
angular.module('veganapp')
    .factory('menuFactory', function ($http) {
    return {
        getFood: function () {
            return $http.get('/api/menu');
        },
        getSort: function () {
            return $http.get('/api/menu/sort')
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        getTyp: function () {
            return $http.get('/api/menu/type')
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        createFood: function (formData) {
            return $http.post('/api/menu', {foodName: formData.jmeno, foodDescription: formData.popis, foodType:formData.typ, foodSort:formData.trida, price: formData.cena} );
        },
        removeFood: function (id) {
            return $http.delete('/api/menu/'+id, {id: id} );
        },
        updateFood: function (id, formData) {
            return $http.put('/api/menu/'+id, {id: id, foodName: formData.jmeno, foodDescription: formData.popis, foodType:formData.typ, foodSort:formData.trida, price: formData.cena});
        }
    };
});