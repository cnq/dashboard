(->
  "use strict"
  angular.module("app.applications.ctrls", []).controller("ApplicationListCtrl", [
    "$scope"
    "$rootScope"
    "logger"
    "$filter"
    "applicationsService"
    "poller"
    "Restangular"
    ($scope, $rootScope, logger, $filter, applicationsService, poller, Restangular) ->
      $scope.applications = []  unless $scope.applications
      poller.reset()

      init = ->
        $scope.search()
        $scope.select $scope.currentPage
        return


      rebuild = (stalearray, fresharray) ->
        $.each fresharray, (index, freshitem) ->
          found = false
          $.each stalearray, (index, staleitem) ->
            if freshitem.name is staleitem.name
              found = true
              staleitem.id = freshitem.id
              staleitem.name = freshitem.name
              staleitem.ipAddress = freshitem.ipAddress
            return

          stalearray.push freshitem  unless found
          return

        init()
        return

      applicationsService.getApplications().then (applications) ->
        $scope.searchKeywords = ""
        $scope.filteredItems = []
        $scope.row = ""
        $scope.select = (page) ->
          end = undefined
          start = undefined
          start = (page - 1) * $scope.numPerPage
          end = start + $scope.numPerPage
          $scope.currentPageItems = $scope.filteredItems.slice(start, end)

        $scope.onFilterChange = ->
          $scope.select 1
          $scope.currentPage = 1
          $scope.row = ""

        $scope.onNumPerPageChange = ->
          $scope.select 1
          $scope.currentPage = 1

        $scope.onOrderChange = ->
          $scope.select 1
          $scope.currentPage = 1

        $scope.search = ->
          $scope.filteredItems = $filter("filter")($scope.applications, $scope.searchKeywords)
          $scope.onFilterChange()

        $scope.order = (rowName) ->
          return  if $scope.row is rowName
          $scope.row = rowName
          $scope.filteredItems = $filter("orderBy")($scope.applications, rowName)
          $scope.onOrderChange()

        $scope.numPerPageOpt = [
          3
          5
          10
          20
        ]
        $scope.numPerPage = $scope.numPerPageOpt[2]
        $scope.currentPage = 1
        $scope.currentPageItems = []
        $scope.deleteApplication = (app) ->
          applicationsService.deleteApplication(app).then ->
            $scope.applications = _.without($scope.applications, app)
            init()


        rebuild $scope.applications, applications
        poller.get(Restangular.all("apps"),
          action: "getList"
          delay: 3000
        ).promise.then null, null, (applications) ->
          rebuild $scope.applications, applications
          return

        return

  ]).controller("RouteListCtrl", [
    "$scope"
    "logger"
    "$routeParams"
    "applicationsService"
    ($scope, logger, $routeParams, applicationsService) ->
      applicationsService.getApplication($routeParams.Id).then (application) ->
        $scope.application = application
        $scope.routes = $scope.application.routes
        $scope.searchKeywords = ""
        $scope.filteredItems = $scope.routes
        $scope.row = ""
        $scope.order = (rowName) ->
          return  if $scope.row is rowName
          $scope.row = rowName
          $scope.filteredItems = $filter("orderBy")($scope.routes, rowName)

      return $scope.deleteRoute = (route) ->
        applicationsService.deleteRoute($scope.application, route).then ->
          $scope.routes = _.without($scope.routes, route)

  ]).controller("ApplicationEditCtrl", [
    "$scope"
    "logger"
    "$routeParams"
    "$location"
    "applicationsService"
    ($scope, logger, $routeParams, $location, applicationsService) ->
      applicationsService.getApplication($routeParams.Id).then (application) ->
        $scope.application = application
        $scope.original = angular.copy($scope.application)

      $scope.canSubmit = ->
        $scope.form_constraints.$valid and not angular.equals($scope.application, $scope.original)

      $scope.submitForm = ->
        return $scope.cancel()  if angular.equals($scope.application, $scope.original)
        $scope.showInfoOnSubmit = true
        applicationsService.saveApplication($scope.application).then ->
          $location.path "/applications"


      return $scope.cancel = ->
        $location.path "/applications"
  ]).controller("RouteEditCtrl", [
    "$scope"
    "logger"
    "$routeParams"
    "$location"
    "applicationsService"
    ($scope, logger, $routeParams, $location, applicationsService) ->
      applicationsService.getApplication($routeParams.Id).then (application) ->
        $scope.application = application
        $scope.route = applicationsService.getRoute($scope.application, $routeParams.routeId)
        $scope.original = angular.copy($scope.route)

      $scope.canSubmit = ->
        $scope.form_constraints.$valid and not angular.equals($scope.route, $scope.original)

      $scope.submitForm = ->
        return $scope.cancel()  if angular.equals($scope.route, $scope.original)
        $scope.showInfoOnSubmit = true
        applicationsService.saveRoute($scope.application, $scope.route).then ->
          $location.path "/applications/" + $scope.application.id + "/routes"


      return $scope.cancel = ->
        $location.path "/applications/" + $scope.application.id + "/routes"
  ]).controller("ApplicationNewCtrl", [
    "$scope"
    "$rootScope"
    "logger"
    "$routeParams"
    "$location"
    "applicationsService"
    "endpointsService"
    ($scope, $rootScope, logger, $routeParams, $location, applicationsService, endpointsService) ->
      $scope.application = applicationsService.newApplication()
      endpointsService.getEndpoints().then (endpoints) ->
        newEndpoint = undefined
        $scope.endpoints = endpoints
        newEndpoint = endpointsService.newEndpoint()
        newEndpoint.name = "Create New Endpoint"
        $scope.endpoints.push newEndpoint
        $scope.application.ipAddress = $scope.endpoints[0].ipAddress

      $scope.original = angular.copy($scope.application)
      $scope.canSubmit = ->
        $scope.form_constraints.$valid and not angular.equals($scope.application, $scope.original)

      $scope.submitForm = ->
        $scope.showInfoOnSubmit = true
        applicationsService.saveApplication($scope.application).then (application) ->
          logger.logSuccess "Application " + application.name + " has been created and exposed at " + application.ipAddress

        if $scope.application.ipAddress.length is 0
          logger.logSuccess "A new public endpoint is being created.  Your application " + $scope.application.name + " with be availible in a few minutes..."
        else
          logger.logSuccess "Your application " + $scope.application.name + " with be availible in a few seconds."
        $location.path "/applications"

      return $scope.cancel = ->
        $location.path "/applications"
  ]).controller "RouteNewCtrl", [
    "$scope"
    "logger"
    "$routeParams"
    "$location"
    "applicationsService"
    ($scope, logger, $routeParams, $location, applicationsService) ->
      applicationsService.getApplication($routeParams.Id).then (application) ->
        $scope.application = application
        $scope.route = applicationsService.newRoute()
        $scope.original = angular.copy($scope.route)

      $scope.canSubmit = ->
        $scope.form_constraints.$valid and not angular.equals($scope.route, $scope.original)

      $scope.submitForm = ->
        $scope.showInfoOnSubmit = true
        applicationsService.saveRoute($scope.application, $scope.route).then ->
          $location.path "/applications/" + $scope.application.id + "/routes"


      return $scope.cancel = ->
        $location.path "/applications/" + $scope.application.id + "/routes"
  ]
  return
).call this