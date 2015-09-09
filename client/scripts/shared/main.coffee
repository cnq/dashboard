'use strict';

angular.module('app.controllers', [])

# overall control
.controller('AppCtrl', [
    '$scope', '$location', '$http', 'currentUserService'
    ($scope, $location, $http, currentUserService) ->
        $scope.isSpecificPage = ->
            path = $location.path()
            return _.contains( [
                '/404'
                '/pages/500'
                '/pages/login'
                '/pages/forgot'
                '/pages/lock-screen'
            ], path )
        
        $scope.main =
            brand: 'cnq.io'
        
        currentUserService.user().then((user) ->
            $scope.currentUser = user
        )
        
        $scope.signout = ->
          $("#mask").fadeIn()
          $.ajax
            url: "/api/auth/signout"
            type: "POST"
            success: (data, textStatus, jqXHR) ->
              window.location.href = "/login.html"
        
          return
        
        $http.get("/api/auth/authenticateduser").success (user, status, headers, config) ->
          if user.isAuthenticated
            $("#mask").fadeOut()
          else
            window.location.href = "/login.html"
        
        
        return
])

.controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter'
    ($scope, taskStorage, filterFilter) ->
        # init
        tasks = $scope.tasks = taskStorage.get()
        $scope.taskRemainingCount = filterFilter(tasks, {completed: false}).length

        $scope.$on('taskRemaining:changed', (event, count) ->
            $scope.taskRemainingCount = count
        )
        $scope.home = () ->
            $('body').removeClass('nav-min-w-content')
            return
        $scope.applications = () ->
            $('body').removeClass('nav-min-w-content')
            return
        $scope.contents = () ->
            $('body').addClass('nav-min-w-content')
            return
        $scope.cms = () ->
            $('body').removeClass('nav-min-w-content')
            return
        $scope.users = () ->
            $('body').removeClass('nav-min-w-content')
            return
])


.controller('DashboardCtrl', [
    '$scope'
    ($scope) ->

])

.filter('iif', () ->
   (input, trueValue, falseValue) ->
        input ? trueValue : falseValue;
)
