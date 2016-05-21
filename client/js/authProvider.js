/**
 * Created by yuliya on 21.5.16.
 */
//TODO move to sevices
angular.module('admin')
    .factory('authProvider', function () {
        var user;
        return {
            setUser: function (thisUser) {
                user = thisUser;
            },
            isLogged: function () {
                return(user) ? user : false;
            }
        };
        }
    );