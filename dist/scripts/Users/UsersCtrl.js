(function() {
  'use strict';
  angular.module('app.users.ctrls', []).controller('UserListCtrl', [
    '$scope', 'logger', '$filter', 'usersService', function($scope, logger, $filter, usersService) {
      var init;
      init = function() {
        $scope.search();
        return $scope.select($scope.currentPage);
      };
      usersService.getUsers().then(function(users) {
        $scope.users = users;
        $scope.searchKeywords = '';
        $scope.filteredItems = [];
        $scope.row = '';
        $scope.select = function(page) {
          var end, start;
          start = (page - 1) * $scope.numPerPage;
          end = start + $scope.numPerPage;
          return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
        };
        $scope.onFilterChange = function() {
          $scope.select(1);
          $scope.currentPage = 1;
          return $scope.row = '';
        };
        $scope.onNumPerPageChange = function() {
          $scope.select(1);
          return $scope.currentPage = 1;
        };
        $scope.onOrderChange = function() {
          $scope.select(1);
          return $scope.currentPage = 1;
        };
        $scope.search = function() {
          $scope.filteredItems = $filter('filter')($scope.users, $scope.searchKeywords);
          return $scope.onFilterChange();
        };
        $scope.order = function(rowName) {
          if ($scope.row === rowName) {
            return;
          }
          $scope.row = rowName;
          $scope.filteredItems = $filter('orderBy')($scope.users, rowName);
          return $scope.onOrderChange();
        };
        $scope.numPerPageOpt = [3, 5, 10, 20];
        $scope.numPerPage = $scope.numPerPageOpt[2];
        $scope.currentPage = 1;
        $scope.currentPageItems = [];
        $scope.deleteUser = function(user) {
          return usersService.deleteUser(user).then(function() {
            $scope.users = _.without($scope.users, user);
            return init();
          });
        };
        init();
      });
    }
  ]).controller('UserEditCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'applicationsService', function($scope, logger, $routeParams, $location, usersService, applicationsService) {
      usersService.getUser($routeParams.Id).then(function(user) {
        $scope.user = user;
        return $scope.original = angular.copy($scope.user);
      });
      $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.user, $scope.original);
      };
      $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return usersService.saveUser($scope.user).then(function() {
          return $location.path('/users');
        });
      };
      applicationsService.getApplications().then(function(applications) {
        return $scope.applications = applications;
      });
      $scope.toggleApplicationSelection = function(name) {
        var idx;
        idx = $scope.user.applications.indexOf(name);
        if (idx > -1) {
          return $scope.user.applications.splice(idx, 1);
        } else {
          return $scope.user.applications.push(name);
        }
      };
      return $scope.cancel = function() {
        return $location.path('/users');
      };
    }
  ]).controller('UserNewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'applicationsService', function($scope, logger, $routeParams, $location, usersService, applicationsService) {
      var original;
      $scope.user = usersService.newUser();
      original = angular.copy($scope.user);
      $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.user, original);
      };
      $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return usersService.saveUser($scope.user).then(function() {
          return $location.path('/users');
        });
      };
      applicationsService.getApplications().then(function(applications) {
        return $scope.applications = applications;
      });
      $scope.toggleApplicationSelection = function(name) {
        var idx;
        idx = $scope.user.applications.indexOf(name);
        if (idx > -1) {
          return $scope.user.applications.splice(idx, 1);
        } else {
          return $scope.user.applications.push(name);
        }
      };
      return $scope.cancel = function() {
        return $location.path('/users');
      };
    }
  ]).controller('UserViewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'currentUserService', function($scope, logger, $routeParams, $location, usersService, currentUserService) {
      return $scope.user = usersService.getUser(currentUserService.user().id);
    }
  ]);

}).call(this);
