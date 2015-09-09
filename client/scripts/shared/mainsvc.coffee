'use strict';

angular.module('app.services', ['restangular'])

  .factory('currentUserService', (Restangular) ->
        currentUser = () ->
            Restangular.one('auth/authenticateduser').get()
        return {
            user: () ->
                return currentUser()
        }
  )










