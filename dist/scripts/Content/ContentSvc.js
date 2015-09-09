(function() {
  'use strict';
  angular.module('app.content.services', ['restangular']).service('contentsService', function(Restangular) {
    var contents;
    contents = {};
    return {
      getContents: function() {
        return Restangular.all('documents').getList();
      },
      getContent: function(id) {
        return Restangular.one('documents', id).get();
      },
      newContent: function() {
        return {
          'id': '',
          'path': '',
          'contentType': '',
          'body': ''
        };
      },
      saveContent: function(content) {
        if (content.id > 0) {
          return content.put();
        } else {
          return Restangular.all('documents').post(content);
        }
      },
      deleteContent: function(content) {
        return content.remove();
      }
    };
  });

}).call(this);
