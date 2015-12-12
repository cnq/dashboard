(function() {
  'use strict';
  angular.module('app.applications.services', ['restangular']).service('applicationsService', function(Restangular) {
    return {
      getApplications: function() {
        return Restangular.all('apps').getList();
      },
      getApplication: function(id) {
        return Restangular.one('apps', id).get();
      },
      getRoute: function(app, routeId) {
        var route;
        route = jQuery.grep(app.routes, function(a) {
          return a.id.toString() === routeId;
        });
        return route[0];
      },
      newApplication: function() {
        return {
          'id': 0,
          'name': '',
          'url': '',
          'authenticationRedirect': '',
          'resetPassword': '',
          'accountVerification': '',
          'ipAddress': '',
          'suppressDefaultEndpoint': 'false',
          'transportSecurity': 'false'
        };
      },
      newRoute: function() {
        return {
          'id': 0,
          'requestPattern': '',
          'passTo': '',
          'routeOrder': 0,
          'requireAuthentication': false,
          'rules': ''
        };
      },
      saveApplication: function(app) {
        if (app.id > 0) {
          return app.put();
        } else {
          return Restangular.all('apps').post(app);
        }
      },
      saveRoute: function(app, route) {
        if (!app.routes) {
          app.routes = [];
        }
        if (app.routes.indexOf(route) === -1) {
          app.routes.push(route);
        }
        return this.saveApplication(app);
      },
      deleteApplication: function(app) {
        return app.remove();
      },
      deleteRoute: function(app, route) {
        var index;
        index = app.routes.indexOf(route);
        if (index > -1) {
          app.routes.splice(index, 1);
        }
        return this.saveApplication(app);
      },
      applicationUrl: function(app) {
        if (app.name) {
          return 'http://' + this.applicationSlug(app);
        }
        return '';
      },
      applicationSlug: function(app) {
        var from, i, l, str, to;
        str = app.name.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        to = "aaaaaeeeeeiiiiooooouuuunc------";
        i = 0;
        l = 0;
        for (i=0, l=from.length ; i<l ; i++) {
              str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            };
        return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      }
    };
  });

}).call(this);
