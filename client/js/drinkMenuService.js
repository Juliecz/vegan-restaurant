angular.module('veganapp')
    .factory('drinkMenu', ['$http', function ($http) {
        return ({
            getDrinks: function () {
                return $http.get('/api/drinkmenu')
                    .success(function (data) {
                        this.jsonData = data;
                    });
            },
            createDrink: function (formData) {
                return $http.post('/api/drinkmenu', {drinkName: formData.jmeno, drinkDescription: formData.popis, drinkType: formData.typ, drinkSort: formData.trida, price: formData.cena});
            },
            removeDrink: function () {
                return $http.delete('/api/drinkmenu/'+id, {id: id});
            },
            updateDrink: function (formData, id) {
                return $http.put('/api/drinkmenu/'+id, {id: id, drinkName: formData.jmeno, drinkDescription: formData.popis, drinkType: formData.typ, drinkSort: formData.trida, price: formData.cena});
            },
            getById: function (id) {
                return $http.get('/api/drinkmenu/id/'+id, {id: id})
                    .success(function (data) {
                        this.jsonData = data;
                    });
            },
            getSort: function () {
                return $http.get('/api/drinkmenu/sort')
                    .success(function (data) {
                        this.jsonData = data;
                    })
            }
        });
    }]);