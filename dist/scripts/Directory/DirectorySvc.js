(function() {
  "use strict";
  angular.module("app.directory.services", []).service("directoryService", [
    "Restangular", "logger", function(Restangular, logger) {
      return {
        newItem: function() {
          return {
            id: "",
            name: "",
            path: "",
            type: "",
            children: []
          };
        },
        getItems: function() {
          return Restangular.all("directory").getList();
        },
        getItem: function(id) {
          return Restangular.one("directory", id).get();
        },
        saveItem: function(item) {
          if (item.id) {
            return item.put();
          } else {
            return Restangular.all("directory").post(item);
          }
        },
        deleteItem: function(item) {
          return Restangular.one("directory", item.id).remove();
        },
        compressItem: function(item) {
          return Restangular.one("directory", item.id).customPOST(item, "compress", {}, {});
        }
      };
    }
  ]);

}).call(this);
