'use strict';

angular.module('app.endpoints.services', ['restangular'])

.service('endpointsService', (Restangular) ->
    return {            
        getEndpoints: () ->
             Restangular.all('endpoints').getList()

        getEndpoint: (id) ->
            return  Restangular.one('endpoints',id).get()

        newEndpoint: () ->
            {'id':0, 'name':'', 'ipAddress':''}

        saveEndpoint: (app) ->
            if(app.id > 0)
                app.put()
            else
                Restangular.all('apps').post(app);

        deleteEndpoint: (app) ->
            app.remove();
    }
)








