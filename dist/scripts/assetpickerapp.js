(function() {
  'use strict';
  angular.module('assetpickerapp', ['ngRoute', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'easypiechart', 'mgo-angular-wizard', 'textAngular', 'ui.tree', 'ngTagsInput', 'restangular', 'rt.encodeuri', 'ui.ace', 'ng-context-menu', 'xeditable', 'app.ui.ctrls', 'app.ui.directives', 'app.ui.services', 'app.controllers', 'app.services', 'app.directives', 'app.form.validation', 'app.ui.form.ctrls', 'app.ui.form.directives', 'app.tables', 'app.task', 'app.localization', 'app.chart.ctrls', 'app.chart.directives', 'app.page.ctrls', 'app.applications.ctrls', 'app.applications.services', 'app.endpoints.ctrls', 'app.endpoints.services', 'app.content.ctrls', 'app.content.services', 'app.directory.ctrls', 'app.directory.services', 'app.users.ctrls', 'app.users.services', 'angularFileUpload', 'emguo.poller']).config([
    '$routeProvider', '$httpProvider', 'RestangularProvider', 'pollerConfig', function($routeProvider, $httpProvider, RestangularProvider, pollerConfig) {
      $.get("/api/auth/authenticateduser", function(user) {
        if (!user.isAuthenticated) {
          return window.location.href = '/login.html';
        }
      });
      pollerConfig.stopOnStateChange = true;
      pollerConfig.stopOnRouteChange = true;
      Ladda.bind('button[type=submit]');
      toastr.options = {
        "closeButton": true,
        "positionClass": "toast-bottom-right",
        "timeOut": "3000"
      };
      RestangularProvider.setBaseUrl('/api/');
      RestangularProvider.setErrorInterceptor(function(response) {
        var msg;
        if (response.status === 401) {
          console.log("Login required... ");
          return window.location.href = '/login.html';
        } else if (response.status === 400) {
          msg = "An error occurred while processing your request";
          if (response.data && response.data.message) {
            msg = response.data.message;
          }
          console.log("Bad Request: " + msg);
          return toastr["error"](msg);
        } else {
          console.log("Response received with HTTP error code: " + response.status);
          if (response.data && response.data.message) {
            msg = response.data.message;
          } else {
            msg = "An error occurred while processing your request";
          }
          toastr["error"](msg);
          return true;
        }
      });
      return $routeProvider.when('/', {
        templateUrl: 'views/pages/blank.html'
      }).when('/contents', {
        templateUrl: 'views/contents/list.html'
      }).when('/contents/:Id/select', {
        templateUrl: 'views/contents/select.html'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).when('/pages/500', {
        templateUrl: 'views/pages/500.html'
      }).when('/pages/blank', {
        templateUrl: 'views/pages/blank.html'
      }).otherwise({
        redirectTo: '/404'
      });
    }
  ]).run([
    '$rootScope', 'Restangular', function($rootScope, Restangular) {
      Restangular.addRequestInterceptor(function(element) {
        $rootScope.loading = true;
        return element;
      });
      return Restangular.addResponseInterceptor(function(data) {
        $rootScope.loading = false;
        return data;
      });
    }
  ]);

}).call(this);
