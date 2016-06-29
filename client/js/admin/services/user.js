angular.module('veganapp.admin')
    .factory('userFactory', function ($http) {
        return {
            getUserById: function (id) {
                return $http.get('/api/user/'+id, {id: id})
                    .success(function (data) {
                        this.jsonData = data;
                    });
            },
            getAllUsers: function () {
                return $http.get('/api/user')
                    .success(function (data) {
                        this.jsonData = data;
                    })
            },
            createUser: function (formData) {
                return $http.post('/api/user', {username: formData.uzivJm, name: formData.jm, surname: formData.prijm, role: formData.role});
            },
            deleteUser: function (id) {
                return $http.delete('/api/user/'+id, {id: id})
            }, 
            updateUser: function (id, formData) {
                return $http.put('/api/user/'+id, {id: id, username: formData.uzivJm, name: formData.jm, surname: formData.prijm, role: formData.role, email: formData.email, phone: formData.phone});
            }
        };
    });