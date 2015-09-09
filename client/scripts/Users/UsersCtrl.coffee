'use strict';

angular.module('app.users.ctrls', [])


.controller('UserListCtrl', [
    '$scope', 'logger','$filter', 'usersService'
    ($scope, logger,$filter, usersService) ->   

        init = ->
            $scope.search()
            $scope.select($scope.currentPage)
        usersService.getUsers().then((users) ->
            $scope.users = users
            $scope.searchKeywords = ''
            $scope.filteredItems = []
            $scope.row = ''

            $scope.select = (page) ->
                start = (page - 1) * $scope.numPerPage
                end = start + $scope.numPerPage
                $scope.currentPageItems = $scope.filteredItems.slice(start, end)
                # console.log start
                # console.log end
                # console.log $scope.currentPageItems

            # on page change: change numPerPage, filtering string
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
                $scope.filteredItems = $filter('filter')($scope.users, $scope.searchKeywords)
                $scope.onFilterChange()

            # orderBy
            $scope.order = (rowName)->
                if $scope.row == rowName
                    return
                $scope.row = rowName
                $scope.filteredItems = $filter('orderBy')($scope.users, rowName)
                # console.log $scope.filteredItems
                $scope.onOrderChange()

            # pagination
            $scope.numPerPageOpt = [3, 5, 10, 20]
            $scope.numPerPage = $scope.numPerPageOpt[2]
            $scope.currentPage = 1
            $scope.currentPageItems = []

            $scope.deleteUser = (user)->
                usersService.deleteUser(user).then(() ->
                    $scope.users = _.without($scope.users, user)
                    init()
                )


            init()
            return
        )
        return
])

.controller('UserEditCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'applicationsService'
    ($scope, logger, $routeParams, $location, usersService, applicationsService) ->  
  
        usersService.getUser($routeParams.Id).then((user) ->
            $scope.user = user
            $scope.original = angular.copy($scope.user)
        )

        $scope.canSubmit = ->
            return $scope.form_constraints.$valid && !angular.equals($scope.user, $scope.original)

        $scope.submitForm = ->
            $scope.showInfoOnSubmit = true
            usersService.saveUser($scope.user).then(() ->
                $location.path('/users')
            )

        applicationsService.getApplications().then((applications) ->
            $scope.applications = applications
        )
      
        $scope.toggleApplicationSelection = (name) ->
            idx = $scope.user.applications.indexOf(name)
            if (idx > -1)
                $scope.user.applications.splice(idx, 1);
            else
                $scope.user.applications.push(name);

        $scope.cancel = ->
            $location.path('/users')
])

.controller('UserNewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'applicationsService'
    ($scope, logger, $routeParams, $location, usersService, applicationsService) ->      
        $scope.user = usersService.newUser() 

        original = angular.copy($scope.user)

        $scope.canSubmit = ->
            return $scope.form_constraints.$valid && !angular.equals($scope.user, original)

        $scope.submitForm = ->
            $scope.showInfoOnSubmit = true
            usersService.saveUser($scope.user).then(() ->
                $location.path('/users')
            )

        applicationsService.getApplications().then((applications) ->
            $scope.applications = applications
        )
      
        $scope.toggleApplicationSelection = (name) ->
            idx = $scope.user.applications.indexOf(name)
            if (idx > -1)
                $scope.user.applications.splice(idx, 1);
            else
                $scope.user.applications.push(name);
        
        $scope.cancel = ->
            $location.path('/users')
])

.controller('UserViewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'currentUserService'
    ($scope, logger, $routeParams, $location, usersService, currentUserService) ->  
        $scope.user = usersService.getUser(currentUserService.user().id) 

])








