(function() {
  (function() {
    "use strict";
    angular.module("app.applications.ctrls", []).controller("ApplicationListCtrl", [
      "$scope", "$rootScope", "logger", "$filter", "applicationsService", "poller", "Restangular", function($scope, $rootScope, logger, $filter, applicationsService, poller, Restangular) {
        var init;
        if (!$scope.applications) {
          $scope.applications = [];
        }
        poller.reset();
        init = function() {
          $scope.filteredItems = $filter("filter")($scope.applications, $scope.searchKeywords);
          $scope.filteredItems = $filter("orderBy")($scope.applications, $scope.row);
          $scope.select($scope.currentPage);
        };
        return applicationsService.getApplications().then(function(applications) {
          $scope.searchKeywords = "";
          $scope.filteredItems = [];
          $scope.row = "";
          $scope.select = function(page) {
            var end, start;
            end = void 0;
            start = void 0;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
          };
          $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = "";
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
            $scope.filteredItems = $filter("filter")($scope.applications, $scope.searchKeywords);
            return $scope.onFilterChange();
          };
          $scope.order = function(rowName) {
            if ($scope.row === rowName) {
              return;
            }
            $scope.row = rowName;
            $scope.filteredItems = $filter("orderBy")($scope.applications, rowName);
            return $scope.onOrderChange();
          };
          $scope.numPerPageOpt = [20, 50, 100];
          $scope.numPerPage = $scope.numPerPageOpt[1];
          $scope.currentPage = 1;
          $scope.currentPageItems = [];
          $scope.deleteApplication = function(app) {
            return applicationsService.deleteApplication(app).then(function() {
              $scope.applications = _.without($scope.applications, app);
              return init();
            });
          };
          poller.get(Restangular.all("apps"), {
            action: "getList",
            delay: 3000
          }).promise.then(null, null, function(applications) {
            $scope.applications = applications;
            init();
          });
        });
      }
    ]).controller("RouteListCtrl", [
      "$scope", "logger", "$routeParams", "applicationsService", function($scope, logger, $routeParams, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          $scope.routes = $scope.application.routes;
          $scope.searchKeywords = "";
          $scope.filteredItems = $scope.routes;
          $scope.row = "";
          return $scope.order = function(rowName) {
            if ($scope.row === rowName) {
              return;
            }
            $scope.row = rowName;
            return $scope.filteredItems = $filter("orderBy")($scope.routes, rowName);
          };
        });
        return $scope.deleteRoute = function(route) {
          return applicationsService.deleteRoute($scope.application, route).then(function() {
            return $scope.routes = _.without($scope.routes, route);
          });
        };
      }
    ]).controller("ApplicationEditCtrl", [
      "$scope", "logger", "$routeParams", "$location", "applicationsService", function($scope, logger, $routeParams, $location, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          return $scope.original = angular.copy($scope.application);
        });
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.application, $scope.original);
        };
        $scope.submitForm = function() {
          if (angular.equals($scope.application, $scope.original)) {
            return $scope.cancel();
          }
          $scope.showInfoOnSubmit = true;
          return applicationsService.saveApplication($scope.application).then(function() {
            return $location.path("/applications");
          });
        };
        return $scope.cancel = function() {
          return $location.path("/applications");
        };
      }
    ]).controller("RouteEditCtrl", [
      "$scope", "logger", "$routeParams", "$location", "applicationsService", function($scope, logger, $routeParams, $location, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          $scope.route = applicationsService.getRoute($scope.application, $routeParams.routeId);
          return $scope.original = angular.copy($scope.route);
        });
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.route, $scope.original);
        };
        $scope.submitForm = function() {
          if (angular.equals($scope.route, $scope.original)) {
            return $scope.cancel();
          }
          $scope.showInfoOnSubmit = true;
          return applicationsService.saveRoute($scope.application, $scope.route).then(function() {
            return $location.path("/applications/" + $scope.application.id + "/routes");
          });
        };
        return $scope.cancel = function() {
          return $location.path("/applications/" + $scope.application.id + "/routes");
        };
      }
    ]).controller("ApplicationNewCtrl", [
      "$scope", "$rootScope", "logger", "$routeParams", "$location", "applicationsService", "endpointsService", function($scope, $rootScope, logger, $routeParams, $location, applicationsService, endpointsService) {
        $scope.application = applicationsService.newApplication();
        endpointsService.getEndpoints().then(function(endpoints) {
          var newEndpoint;
          newEndpoint = void 0;
          $scope.endpoints = endpoints;
          newEndpoint = endpointsService.newEndpoint();
          newEndpoint.name = "Create New Endpoint";
          $scope.endpoints.push(newEndpoint);
          return $scope.application.ipAddress = $scope.endpoints[0].ipAddress;
        });
        $scope.original = angular.copy($scope.application);
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.application, $scope.original);
        };
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          applicationsService.saveApplication($scope.application).then(function(application) {
            return logger.logSuccess("Application " + application.name + " has been created and exposed at " + application.ipAddress);
          });
          if ($scope.application.ipAddress.length === 0) {
            logger.logSuccess("A new public endpoint is being created.  Your application " + $scope.application.name + " with be availible in a few minutes...");
          } else {
            logger.logSuccess("Your application " + $scope.application.name + " with be availible in a few seconds.");
          }
          return $location.path("/applications");
        };
        return $scope.cancel = function() {
          return $location.path("/applications");
        };
      }
    ]).controller("RouteNewCtrl", [
      "$scope", "logger", "$routeParams", "$location", "applicationsService", function($scope, logger, $routeParams, $location, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          $scope.route = applicationsService.newRoute();
          return $scope.original = angular.copy($scope.route);
        });
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.route, $scope.original);
        };
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return applicationsService.saveRoute($scope.application, $scope.route).then(function() {
            return $location.path("/applications/" + $scope.application.id + "/routes");
          });
        };
        return $scope.cancel = function() {
          return $location.path("/applications/" + $scope.application.id + "/routes");
        };
      }
    ]);
  }).call(this);

}).call(this);
