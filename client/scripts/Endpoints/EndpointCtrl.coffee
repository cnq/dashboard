'use strict';

angular.module('app.endpoints.ctrls', [])


.controller('EndpointListCtrl', [
    '$scope', 'logger','$filter', 'endpointsService'
    ($scope, logger,$filter, endpointsService) ->   


        init = ->
            $scope.search()
            $scope.select($scope.currentPage)
        endpointsService.getEndpoints().then((endpoints) ->
            $scope.endpoints = endpoints
            $scope.searchKeywords = ''
            $scope.filteredItems = []
            $scope.row = ''

            $scope.select = (page) ->
                start = (page - 1) * $scope.numPerPage
                end = start + $scope.numPerPage
                $scope.currentPageItems = $scope.filteredItems.slice(start, end)

            $scope.onFilterChange = ->
                $scope.select(1)
                $scope.currentPage = 1
                $scope.row = ''

            $scope.onNumPerPageChange = ->
                $scope.select(1)
                $scope.currentPage = 1

            $scope.onOrderChange = ->
                $scope.select(1)
                $scope.currentPage = 1            

            $scope.search = ->
                $scope.filteredItems = $filter('filter')($scope.endpoints, $scope.searchKeywords)
                $scope.onFilterChange()

            # orderBy
            $scope.order = (rowName)->
                if $scope.row == rowName
                    return
                $scope.row = rowName
                $scope.filteredItems = $filter('orderBy')($scope.endpoints, rowName)
                $scope.onOrderChange()

            # pagination
            $scope.numPerPageOpt = [3, 5, 10, 20]
            $scope.numPerPage = $scope.numPerPageOpt[2]
            $scope.currentPage = 1
            $scope.currentPageItems = []

            $scope.deleteEndpoint = (app)->
                endpointsService.deleteEndpoint(app).then(() ->
                    $scope.endpoints = _.without($scope.endpoints, app)
                    init()
                )

            init()
            return
        )
        return
])

.controller('EndpointNewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'endpointsService'
    ($scope, logger, $routeParams, $location, endpointsService) ->      
        $scope.endpoint = endpointsService.newEndpoint() 

        $scope.original = angular.copy($scope.endpoint)

        $scope.canSubmit = ->
            return $scope.form_constraints.$valid && !angular.equals($scope.endpoint, $scope.original)

        $scope.submitForm = ->
            $scope.showInfoOnSubmit = true
            endpointsService.saveEndpoint($scope.endpoint).then(() ->
                $location.path('/endpoints')
            )

        $scope.cancel = ->
            $location.path('/endpoints')

])







