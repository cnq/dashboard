(function() {
  'use strict';
  angular.module('app.services', ['restangular']).factory('currentUserService', function(Restangular) {
    var currentUser;
    currentUser = function() {
      return Restangular.one('auth/authenticateduser').get();
    };
    return {
      user: function() {
        return currentUser();
      }
    };
  });

}).call(this);
