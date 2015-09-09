(function() {
  (function() {
    "use strict";
    return angular.module("app.content.ctrls", []).controller("ContentListCtrl", [
      "$scope", "logger", "$filter", "contentsService", function($scope, logger, $filter, contentsService) {
        var init;
        init = void 0;
        init = function() {
          $scope.search();
          return $scope.select($scope.currentPage);
        };
        return contentsService.getContents().then(function(contents) {
          $scope.contents = contents;
          $scope.searchKeywords = "";
          $scope.filteredItems = [];
          $scope.row = "";
          $scope.select = function(page) {
            var end, start;
            end = void 0;
            start = void 0;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
          };
          $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = "";
          };
          $scope.onNumPerPageChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.search = function() {
            $scope.filteredItems = $filter("filter")($scope.contents, $scope.searchKeywords);
            return $scope.onFilterChange();
          };
          $scope.order = function(rowName) {
            if ($scope.row === rowName) {
              return;
            }
            $scope.row = rowName;
            $scope.filteredItems = $filter("orderBy")($scope.contents, rowName);
            return $scope.onOrderChange();
          };
          $scope.numPerPageOpt = [3, 5, 10, 20];
          $scope.numPerPage = $scope.numPerPageOpt[2];
          $scope.currentPage = 1;
          $scope.currentPageItems = [];
          $scope.deleteContent = function(content) {
            return contentsService.deleteContent(content).then(function() {
              $scope.contents = _.without($scope.contents, content);
              return init();
            });
          };
          return init();
        });
      }
    ]).controller("ContentViewCtrl", [
      "$scope", "logger", "$routeParams", "$location", "directoryService", function($scope, logger, $routeParams, $location, directoryService) {
        directoryService.getItem($routeParams.Id).then(function(content) {
          return $scope.content = content;
        });
        return $scope.download = function() {
          return window.open(downloadPath, "_blank", "");
        };
      }
    ]).controller("ContentSelectCtrl", [
      "$scope", "logger", "$routeParams", "$location", "directoryService", function($scope, logger, $routeParams, $location, directoryService) {
        directoryService.getItem($routeParams.Id).then(function(content) {
          return $scope.content = content;
        });
        $scope.download = function() {
          return window.open(downloadPath, "_blank", "");
        };
        return $scope.onSelectClick = function(item) {
          parent.$.colorbox.selectedData = {
            id: item.id,
            path: item.path
          };
          return parent.$.colorbox.close();
        };
      }
    ]).controller("ContentEditCtrl", [
      "$scope", "logger", "$routeParams", "$location", "contentsService", function($scope, logger, $routeParams, $location, contentsService) {
        contentsService.getContent($routeParams.Id).then(function(content) {
          $scope.content = content;
          $scope.original = angular.copy($scope.content);
          $scope.editorSession.setValue($scope.content.body);
          if ($scope.content.contentType.indexOf("javascript") >= 0) {
            $scope.editorSession.setMode("ace/mode/javascript");
          } else if ($scope.content.contentType.indexOf("css") >= 0) {
            $scope.editorSession.setMode("ace/mode/css");
          } else {
            $scope.editorSession.setMode("ace/mode/html");
          }
          $scope.editorSession.on("change", function() {
            $scope.content.body = $scope.editorSession.getValue();
            return $scope.$apply();
          });
          return $scope.canSubmit = function() {
            return $scope.content.path && !angular.equals($scope.content, $scope.original);
          };
        });
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return contentsService.saveContent($scope.content).then(function() {
            return $location.path("/contents");
          });
        };
        $scope.cancel = function() {
          return $location.path("/contents");
        };
        return $scope.aceLoaded = function(editor) {
          var renderer, session;
          renderer = void 0;
          session = void 0;
          session = editor.getSession();
          $scope.editorSession = session;
          renderer = editor.renderer;
          editor.setHighlightActiveLine(false);
          editor.setShowPrintMargin(false);
          editor.setOptions({
            enableBasicAutocompletion: true
          });
          return editor.commands.addCommand({
            name: "saveFile",
            bindKey: {
              win: "Ctrl-S",
              mac: "Command-S",
              sender: "editor|cli"
            },
            exec: function(env, args, request) {
              $scope.showInfoOnSubmit = true;
              contentsService.saveContent($scope.content);
              $scope.original = angular.copy($scope.content);
              return $scope.$apply();
            }
          });
        };
      }
    ]).controller("ContentNewFilesCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", function($rootScope, $scope, logger, $routeParams, $location) {
        $scope.newCodeFile = function() {
          return $location.path("/contents/new");
        };
        return $scope.uploadFiles = function() {
          return $location.path("/contents/upload");
        };
      }
    ]).controller("ContentCmsHomeCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", function($rootScope, $scope, logger, $routeParams, $location) {
        $scope["new"] = function() {
          return $location.path("/cms/new");
        };
        $scope.audit = function() {
          return $location.path("/cms/audit");
        };
        $scope.list = function() {
          return $location.path("/cms/items");
        };
        $scope.types = function() {
          return $location.path("/cms/types");
        };
        $scope.workflows = function() {
          return $location.path("/cms/workflows");
        };
        $scope.queries = function() {
          return $location.path("/cms/projections");
        };
        return $scope.newLayout = function() {
          return $location.path("/contents/newlayout");
        };
      }
    ]).controller("ContentNewCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", "contentsService", function($rootScope, $scope, logger, $routeParams, $location, contentsService) {
        $scope.content = contentsService.newContent();
        if ($rootScope.currentFolder) {
          $scope.content.path = $rootScope.currentFolder + "/untitled.html";
        }
        $scope.original = angular.copy($scope.content);
        $scope.canSubmit = function() {
          return $scope.content.path && !angular.equals($scope.content, $scope.original);
        };
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return contentsService.saveContent($scope.content).then(function() {
            return $location.path("/contents");
          });
        };
        $scope.cancel = function() {
          return $location.path("/contents");
        };
        return $scope.aceLoaded = function(editor) {
          var renderer, session;
          renderer = void 0;
          session = void 0;
          session = editor.getSession();
          $scope.editorSession = session;
          renderer = editor.renderer;
          editor.setHighlightActiveLine(false);
          editor.setShowPrintMargin(false);
          editor.setOptions({
            enableBasicAutocompletion: true
          });
          $scope.editorSession.setMode("ace/mode/html");
          $scope.editorSession.on("change", function() {
            $scope.content.body = $scope.editorSession.getValue();
            return $scope.$apply();
          });
          return editor.commands.addCommand({
            name: "saveFile",
            bindKey: {
              win: "Ctrl-S",
              mac: "Command-S",
              sender: "editor|cli"
            },
            exec: function(env, args, request) {
              $scope.showInfoOnSubmit = true;
              contentsService.saveContent($scope.content);
              $scope.original = angular.copy($scope.content);
              return $scope.$apply();
            }
          });
        };
      }
    ]).controller("ContentUploadCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", "$upload", function($rootScope, $scope, logger, $routeParams, $location, $upload) {
        $scope.uploadprogress = 0;
        $scope.onFileSelect = function($files) {
          var file, _i, _len, _results;
          file = void 0;
          _i = void 0;
          _len = void 0;
          _results = void 0;
          _results = [];
          _i = 0;
          _len = $files.length;
          while (_i < _len) {
            file = $files[_i];
            _results.push($scope.upload = $upload.upload({
              url: "/api/files",
              method: "POST",
              data: {
                basepath: $rootScope.currentFolder
              },
              file: file
            }).progress(function(evt) {
              $scope.uploadprogress = parseInt(100.0 * evt.loaded / evt.total);
              return console.log("percent: " + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
              return logger.logSuccess("File Uploaded");
            }));
            _i++;
          }
          return _results;
        };
        return $scope.cancel = function() {
          return $location.path("/files");
        };
      }
    ]);
  }).call(this);

}).call(this);

//# sourceMappingURL=ContentCtrl.js.map
