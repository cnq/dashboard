(function() {
  'use strict';
  angular.module('app.endpoints.services', ['restangular']).service('endpointsService', function(Restangular) {
    return {
      getEndpoints: function() {
        return Restangular.all('endpoints').getList();
      },
      getEndpoint: function(id) {
        return Restangular.one('endpoints', id).get();
      },
      newEndpoint: function() {
        return {
          'id': 0,
          'name': '',
          'ipAddress': ''
        };
      },
      saveEndpoint: function(app) {
        if (app.id > 0) {
          return app.put();
        } else {
          return Restangular.all('apps').post(app);
        }
      },
      deleteEndpoint: function(app) {
        return app.remove();
      }
    };
  });

}).call(this);
