(function() {
  (function() {
    "use strict";
    return angular.module("app.directory.ctrls", []).controller("DirectoryCtrl", [
      "$rootScope", "$scope", "$q", "$filter", "logger", "$location", "directoryService", function($rootScope, $scope, $q, $filter, logger, $location, directoryService) {
        $scope.list = [];
        $scope.directoryItemParent = [];
        directoryService.getItems().then(function(items) {
          $scope.list = items;
          return $scope.populateFirstChildren(items).then(function() {
            return $scope.buildChildMap();
          });
        });
        $scope.populateFirstChildren = function(list) {
          var promises;
          promises = void 0;
          promises = [];
          angular.forEach(list, function(currentItem) {
            var promise;
            promise = void 0;
            promise = directoryService.getItem(currentItem.id).then(function(item) {
              return currentItem.children = item.children;
            });
            return promises.push(promise);
          });
          return $q.all(promises);
        };
        $scope.buildChildMap = function() {
          var rootItems;
          rootItems = void 0;
          $scope.directoryItemParent.length = 0;
          rootItems = $scope.list;
          return angular.forEach(rootItems, function(rootItem) {
            return $scope.mapChildren(rootItem);
          });
        };
        $scope.mapChildren = function(item) {
          return angular.forEach(item.children, function(child) {
            $scope.directoryItemParent.push({
              parent: item,
              child: child
            });
            return $scope.mapChildren(child);
          });
        };
        $scope.getParent = function(item) {
          var result;
          result = void 0;
          result = $filter("filter")($scope.directoryItemParent, {
            child: item
          }, true);
          if (result.length) {
            return result[0].parent;
          } else {
            return null;
          }
        };
        $scope.itemPath = function(item) {
          var currentItem, path;
          currentItem = void 0;
          path = void 0;
          currentItem = item;
          path = "";
          while (currentItem) {
            path = "/" + currentItem.name + path;
            currentItem = $scope.getParent(currentItem);
          }
          return path;
        };
        $scope.selectedItem = {};
        $scope.onRightClick = function(item, inlineForm) {
          $scope.selectedItem = item;
          return $scope.selectedItemInlineForm = inlineForm;
        };
        $scope.remove = function() {
          $("#cm").removeClass("open");
          directoryService.deleteItem($scope.selectedItem.$modelValue);
          return $scope.selectedItem.remove();
        };
        $scope.renameClick = function() {
          return $scope.selectedItemInlineForm.$show();
        };
        $scope.compress = function() {
          return directoryService.compressItem($scope.selectedItem.$modelValue).then()(function() {
            var parent;
            parent = void 0;
            parent = $scope.getParent($scope.selectedItem);
            return $scope.refreshFolder(parent);
          });
        };
        $scope.saveRename = function(newName, item) {
          if (item.name === newName) {
            return;
          }
          item.name = newName;
          item.path = $scope.itemPath(item);
          return directoryService.getItem(item.id).then(function(freshItem) {
            freshItem.name = item.name;
            freshItem.path = item.path;
            return directoryService.saveItem(freshItem).then(function(freshItem) {
              item.id = freshItem.id;
              item.children = freshItem.children;
              return $scope.buildChildMap();
            });
          });
        };
        $scope.onFolderClick = function(item) {
          if (item.collapsed) {
            $scope.expandFolder(item);
            return $scope.refreshFolder(item);
          } else {
            return $scope.collapseFolder(item);
          }
        };
        $scope.onFileClick = function(item) {
          if (item.$modelValue.path.endsWith(".html") || item.$modelValue.path.endsWith(".css") || item.$modelValue.path.endsWith(".js") || item.$modelValue.path.endsWith(".json") || item.$modelValue.path.endsWith(".txt")) {
            return $location.path("/contents/" + item.$modelValue.id + "/edit");
          } else {
            return $location.path("/contents/" + item.$modelValue.id + "/view");
          }
        };
        $scope.onFileSelectClick = function(item) {
          return $location.path("/contents/" + item.$modelValue.id + "/select");
        };
        $scope.expandFolder = function(item) {
          if (item.collapsed) {
            return item.toggle();
          }
        };
        $scope.collapseFolder = function(item) {
          if (!item.collapsed) {
            item.toggle();
            return $("#file-scroll").slimscroll();
          }
        };
        $scope.refresh = function() {
          $scope.refreshFolder($scope.selectedItem);
          return $scope.expandFolder($scope.selectedItem);
        };
        $scope.refreshFolder = function(item) {
          directoryService.getItem(item.$modelValue.id).then(function(freshItem) {
            item.$modelValue.children = freshItem.children;
            return $scope.buildChildMap();
          });
          $scope.populateFirstChildren(item.$modelValue.children).then(function() {
            return $scope.buildChildMap();
          });
          return $("#file-scroll").slimscroll();
        };
        $scope.newFiles = function() {
          $rootScope.currentFolder = $scope.selectedItem.$modelValue.path;
          return $location.path("/contents/newfiles");
        };
        return $scope.newSubFolder = function() {
          var newItem;
          newItem = void 0;
          newItem = directoryService.newItem();
          newItem.type = "Directory";
          newItem.name = "untitled";
          $scope.selectedItem.$modelValue.children.push(newItem);
          $scope.buildChildMap();
          newItem.path = $scope.itemPath(newItem);
          return directoryService.saveItem(newItem).then(function(freshItem) {
            $scope.refreshFolder($scope.selectedItem);
            return $scope.expandFolder($scope.selectedItem);
          });
        };
      }
    ]);
  }).call(this);

}).call(this);

//# sourceMappingURL=DirectoryCtrl.js.map
