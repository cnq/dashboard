(->
  "use strict"
  angular.module("app.content.ctrls", []).controller("ContentListCtrl", [ "$scope", "logger", "$filter", "contentsService", ($scope, logger, $filter, contentsService) ->
    init = undefined
    init = ->
      $scope.search()
      $scope.select $scope.currentPage

    contentsService.getContents().then (contents) ->
      $scope.contents = contents
      $scope.searchKeywords = ""
      $scope.filteredItems = []
      $scope.row = ""
      $scope.select = (page) ->
        end = undefined
        start = undefined
        start = (page - 1) * $scope.numPerPage
        end = start + $scope.numPerPage
        $scope.currentPageItems = $scope.filteredItems.slice(start, end)

      $scope.onFilterChange = ->
        $scope.select 1
        $scope.currentPage = 1
        $scope.row = ""

      $scope.onNumPerPageChange = ->
        $scope.select 1
        $scope.currentPage = 1

      $scope.onOrderChange = ->
        $scope.select 1
        $scope.currentPage = 1

      $scope.search = ->
        $scope.filteredItems = $filter("filter")($scope.contents, $scope.searchKeywords)
        $scope.onFilterChange()

      $scope.order = (rowName) ->
        return  if $scope.row is rowName
        $scope.row = rowName
        $scope.filteredItems = $filter("orderBy")($scope.contents, rowName)
        $scope.onOrderChange()

      $scope.numPerPageOpt = [ 3, 5, 10, 20 ]
      $scope.numPerPage = $scope.numPerPageOpt[2]
      $scope.currentPage = 1
      $scope.currentPageItems = []
      $scope.deleteContent = (content) ->
        contentsService.deleteContent(content).then ->
          $scope.contents = _.without($scope.contents, content)
          init()


      init()

   ]).controller("ContentViewCtrl", [ "$scope", "logger", "$routeParams", "$location", "directoryService", ($scope, logger, $routeParams, $location, directoryService) ->
    directoryService.getItem($routeParams.Id).then (content) ->
      $scope.content = content

    $scope.download = ->
      window.open downloadPath, "_blank", ""
   ]).controller("ContentSelectCtrl", [ "$scope", "logger", "$routeParams", "$location", "directoryService", ($scope, logger, $routeParams, $location, directoryService) ->
    directoryService.getItem($routeParams.Id).then (content) ->
      $scope.content = content

    $scope.download = ->
      window.open downloadPath, "_blank", ""

    $scope.onSelectClick = (item) ->
      parent.$.colorbox.selectedData =
        id: item.id
        path: item.path

      parent.$.colorbox.close()
   ]).controller("ContentEditCtrl", [ "$scope", "logger", "$routeParams", "$location", "contentsService", ($scope, logger, $routeParams, $location, contentsService) ->
    contentsService.getContent($routeParams.Id).then (content) ->
      $scope.content = content
      $scope.original = angular.copy($scope.content)
      $scope.editorSession.setValue $scope.content.body
      if $scope.content.contentType.indexOf("javascript") >= 0
        $scope.editorSession.setMode "ace/mode/javascript"
      else if $scope.content.contentType.indexOf("css") >= 0
        $scope.editorSession.setMode "ace/mode/css"
      else
        $scope.editorSession.setMode "ace/mode/html"
      $scope.editorSession.on "change", ->
        $scope.content.body = $scope.editorSession.getValue()
        $scope.$apply()

      $scope.canSubmit = ->
        $scope.content.path and not angular.equals($scope.content, $scope.original)

    $scope.submitForm = ->
      $scope.showInfoOnSubmit = true
      contentsService.saveContent($scope.content).then ->
        $location.path "/contents"


    $scope.cancel = ->
      $location.path "/contents"

    $scope.aceLoaded = (editor) ->
      renderer = undefined
      session = undefined
      session = editor.getSession()
      $scope.editorSession = session
      renderer = editor.renderer
      editor.setHighlightActiveLine false
      editor.setShowPrintMargin false
      editor.setOptions enableBasicAutocompletion: true
      editor.commands.addCommand
        name: "saveFile"
        bindKey:
          win: "Ctrl-S"
          mac: "Command-S"
          sender: "editor|cli"

        exec: (env, args, request) ->
          $scope.showInfoOnSubmit = true
          contentsService.saveContent $scope.content
          $scope.original = angular.copy($scope.content)
          $scope.$apply()

   ]).controller("ContentNewFilesCtrl", [ "$rootScope", "$scope", "logger", "$routeParams", "$location", ($rootScope, $scope, logger, $routeParams, $location) ->
    $scope.newCodeFile = ->
      $location.path "/contents/new"

    $scope.uploadFiles = ->
      $location.path "/contents/upload"
   ]).controller("ContentCmsHomeCtrl", [ "$rootScope", "$scope", "logger", "$routeParams", "$location", ($rootScope, $scope, logger, $routeParams, $location) ->
    $scope["new"] = ->
      $location.path "/cms/new"

    $scope.audit = ->
      $location.path "/cms/audit"

    $scope.list = ->
      $location.path "/cms/items"

    $scope.types = ->
      $location.path "/cms/types"

    $scope.workflows = ->
      $location.path "/cms/workflows"

    $scope.queries = ->
      $location.path "/cms/projections"

    $scope.newLayout = ->
      $location.path "/contents/newlayout"
   ]).controller("ContentNewCtrl", [ "$rootScope", "$scope", "logger", "$routeParams", "$location", "contentsService", ($rootScope, $scope, logger, $routeParams, $location, contentsService) ->
    $scope.content = contentsService.newContent()
    $scope.content.path = $rootScope.currentFolder + "/untitled.html"  if $rootScope.currentFolder
    $scope.original = angular.copy($scope.content)
    $scope.canSubmit = ->
      $scope.content.path and not angular.equals($scope.content, $scope.original)

    $scope.submitForm = ->
      $scope.showInfoOnSubmit = true
      contentsService.saveContent($scope.content).then ->
        $location.path "/contents"


    $scope.cancel = ->
      $location.path "/contents"

    $scope.aceLoaded = (editor) ->
      renderer = undefined
      session = undefined
      session = editor.getSession()
      $scope.editorSession = session
      renderer = editor.renderer
      editor.setHighlightActiveLine false
      editor.setShowPrintMargin false
      editor.setOptions enableBasicAutocompletion: true
      $scope.editorSession.setMode "ace/mode/html"
      $scope.editorSession.on "change", ->
        $scope.content.body = $scope.editorSession.getValue()
        $scope.$apply()

      editor.commands.addCommand
        name: "saveFile"
        bindKey:
          win: "Ctrl-S"
          mac: "Command-S"
          sender: "editor|cli"

        exec: (env, args, request) ->
          $scope.showInfoOnSubmit = true
          contentsService.saveContent $scope.content
          $scope.original = angular.copy($scope.content)
          $scope.$apply()

   ]).controller "ContentUploadCtrl", [ "$rootScope", "$scope", "logger", "$routeParams", "$location", "$upload", ($rootScope, $scope, logger, $routeParams, $location, $upload) ->
    $scope.uploadprogress = 0
    $scope.onFileSelect = ($files) ->
      file = undefined
      _i = undefined
      _len = undefined
      _results = undefined
      _results = []
      _i = 0
      _len = $files.length

      while _i < _len
        file = $files[_i]
        _results.push $scope.upload = $upload.upload(
          url: "/api/files"
          method: "POST"
          data:
            basepath: $rootScope.currentFolder

          file: file
        ).progress((evt) ->
          $scope.uploadprogress = parseInt(100.0 * evt.loaded / evt.total)
          console.log "percent: " + parseInt(100.0 * evt.loaded / evt.total)
        ).success((data, status, headers, config) ->
          logger.logSuccess "File Uploaded"
        )
        _i++
      _results

    $scope.cancel = ->
      $location.path "/files"
   ]
).call this