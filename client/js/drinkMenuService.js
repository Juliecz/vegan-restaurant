angular.module('veganapp')
    .factory('drinkMenu', ['$http', function ($http) {
        return ({
            getDrinks: function () {
                return $http.get('/api/drinkmenu')
                    .success(function (data) {
                        this.jsonData = data;
                    });
            },
            createDrink: function () {
                return $http.post('/api/drinkmenu', {drinkName: formData.jmeno, drinkDescription: formData.popis, drinkType: formData.typ, drinkSort: formData.trida, price: formData.cena});
            },
            removeDrink: function () {
                return $http.delete('/api/drinkmenu/'+id, {id: id});
            },
            updateDrink: function () {
                return $http.put('/api/drinkmenu/'+id, {id: id, drinkName: formData.jmeno, drinkDescription: formData.popis, drinkType: formData.typ, drinkSort: formData.trida, price: formData.cena});
            }
        });
    }]);