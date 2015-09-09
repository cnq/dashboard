(function() {
  'use strict';
  angular.module('app.endpoints.ctrls', []).controller('EndpointListCtrl', [
    '$scope', 'logger', '$filter', 'endpointsService', function($scope, logger, $filter, endpointsService) {
      var init;
      init = function() {
        $scope.search();
        return $scope.select($scope.currentPage);
      };
      endpointsService.getEndpoints().then(function(endpoints) {
        $scope.endpoints = endpoints;
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
          $scope.filteredItems = $filter('filter')($scope.endpoints, $scope.searchKeywords);
          return $scope.onFilterChange();
        };
        $scope.order = function(rowName) {
          if ($scope.row === rowName) {
            return;
          }
          $scope.row = rowName;
          $scope.filteredItems = $filter('orderBy')($scope.endpoints, rowName);
          return $scope.onOrderChange();
        };
        $scope.numPerPageOpt = [3, 5, 10, 20];
        $scope.numPerPage = $scope.numPerPageOpt[2];
        $scope.currentPage = 1;
        $scope.currentPageItems = [];
        $scope.deleteEndpoint = function(app) {
          return endpointsService.deleteEndpoint(app).then(function() {
            $scope.endpoints = _.without($scope.endpoints, app);
            return init();
          });
        };
        init();
      });
    }
  ]).controller('EndpointNewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'endpointsService', function($scope, logger, $routeParams, $location, endpointsService) {
      $scope.endpoint = endpointsService.newEndpoint();
      $scope.original = angular.copy($scope.endpoint);
      $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.endpoint, $scope.original);
      };
      $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return endpointsService.saveEndpoint($scope.endpoint).then(function() {
          return $location.path('/endpoints');
        });
      };
      return $scope.cancel = function() {
        return $location.path('/endpoints');
      };
    }
  ]);

}).call(this);
