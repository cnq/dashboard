'use strict';

angular.module('app.users.services', ['restangular'])

.service('usersService', (Restangular) ->


    return {            
        getUsers: () ->
            Restangular.all('users').getList()

        getUser: (id) ->
            Restangular.one('users',id).get()

        newUser: () ->
            {'id':0, 'userName':'', 'email':'', 'password':'', 'isAccountAdmin':false, 'applications':[]}

        saveUser: (user) ->
            if(user.id > 0)
                user.put()
            else
                Restangular.all('users').post(user);

        deleteUser: (user) ->
            user.remove()

    }
)








