(function() {
  'use strict';
  angular.module('app.users.services', ['restangular']).service('usersService', function(Restangular) {
    return {
      getUsers: function() {
        return Restangular.all('users').getList();
      },
      getUser: function(id) {
        return Restangular.one('users', id).get();
      },
      newUser: function() {
        return {
          'id': 0,
          'userName': '',
          'email': '',
          'password': '',
          'isAccountAdmin': false,
          'applications': []
        };
      },
      saveUser: function(user) {
        if (user.id > 0) {
          return user.put();
        } else {
          return Restangular.all('users').post(user);
        }
      },
      deleteUser: function(user) {
        return user.remove();
      }
    };
  });

}).call(this);
