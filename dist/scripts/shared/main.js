(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', '$location', '$http', 'currentUserService', function($scope, $rootScope, $location, $http, currentUserService) {
      $scope.isSpecificPage = function() {
        var path;
        path = $location.path();
        return _.contains(['/404', '/pages/500', '/pages/login', '/pages/forgot', '/pages/lock-screen'], path);
      };
      $scope.brand = $rootScope.brand.name;
      currentUserService.user().then(function(user) {
        $scope.currentUser = user;
        if (user.isAuthenticated) {
          return $("#mask").fadeOut();
        } else {
          return window.location.href = "/login.html";
        }
      });
      $scope.signout = function() {
        $("#mask").fadeIn();
        $.ajax({
          url: "/api/auth/signout",
          type: "POST",
          success: function(data, textStatus, jqXHR) {
            return window.location.href = "/login.html";
          }
        });
      };
    }
  ]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
      $scope.home = function() {
        $('body').removeClass('nav-min-w-content');
      };
      $scope.applications = function() {
        $('body').removeClass('nav-min-w-content');
      };
      $scope.contents = function() {
        $('body').addClass('nav-min-w-content');
      };
      $scope.cms = function() {
        $('body').removeClass('nav-min-w-content');
      };
      return $scope.users = function() {
        $('body').removeClass('nav-min-w-content');
      };
    }
  ]).controller('DashboardCtrl', ['$scope', function($scope) {}]).filter('iif', function() {
    return function(input, trueValue, falseValue) {
      return input != null ? input : {
        trueValue: falseValue
      };
    };
  });

}).call(this);
