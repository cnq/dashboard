'use strict';

angular.module('app.content.services', ['restangular'])

.service('contentsService', (Restangular) ->
    contents = {}
    return {
        getContents: () ->
            Restangular.all('documents').getList()

        getContent: (id) ->
            Restangular.one('documents',id).get()

        newContent: () ->
            {'id':'', 'path':'', 'contentType':'', 'body':''}

        saveContent: (content) ->
            if(content.id > 0)
                content.put()
            else
                Restangular.all('documents').post(content);


        deleteContent: (content) ->
            content.remove()

    }
)








