angular.module('veganapp')
.factory('reservationFactory', ['$http', function ($http) {
    return({
        getReservations: function () {
            return $http.get('/api/reservation')
                .success(function (data) {
                    this.jsonData = data;
                });
        },
        getForDay: function (date) {
            return $http.get('/api/reservation/'+date);
        },
        createReservation: function (res, startDate, endDate) {
            return $http.post('/api/reservation', {jmeno: res.jmeno, prijmeni: res.prijmeni, tableId: res.table, email: res.email, tel: res.tel, startDate: startDate, endDate: endDate});
        },
        deleteReservation: function (id) {
            return $http.delete('/api/reservation/'+id);
        },
        updateReservation: function (res, startDate, endDate) {
            return $http.put('/api/reservation', {jmeno: res.jmeno, prijmeni: res.prijmeni, tableId: res.table, email: res.email, tel: res.tel, startDate: startDate, endDate: endDate});
        }
    });
}]);