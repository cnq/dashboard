(->
  "use strict"
  angular.module("app.directory.ctrls", []).controller "DirectoryCtrl", [ "$rootScope", "$scope", "$q", "$filter", "logger", "$location", "directoryService", ($rootScope, $scope, $q, $filter, logger, $location, directoryService) ->
    $scope.list = []
    $scope.directoryItemParent = []
    directoryService.getItems().then (items) ->
      $scope.list = items
      $scope.populateFirstChildren(items).then ->
        $scope.buildChildMap()


    $scope.populateFirstChildren = (list) ->
      promises = undefined
      promises = []
      angular.forEach list, (currentItem) ->
        promise = undefined
        promise = directoryService.getItem(currentItem.id).then((item) ->
          currentItem.children = item.children
        )
        promises.push promise

      $q.all promises

    $scope.buildChildMap = ->
      rootItems = undefined
      $scope.directoryItemParent.length = 0
      rootItems = $scope.list
      angular.forEach rootItems, (rootItem) ->
        $scope.mapChildren rootItem


    $scope.mapChildren = (item) ->
      angular.forEach item.children, (child) ->
        $scope.directoryItemParent.push
          parent: item
          child: child

        $scope.mapChildren child


    $scope.getParent = (item) ->
      result = undefined
      result = $filter("filter")($scope.directoryItemParent,
        child: item
      , true)
      if result.length
        result[0].parent
      else
        null

    $scope.itemPath = (item) ->
      currentItem = undefined
      path = undefined
      currentItem = item
      path = ""
      while currentItem
        path = "/" + currentItem.name + path
        currentItem = $scope.getParent(currentItem)
      path

    $scope.selectedItem = {}
    $scope.onRightClick = (item, inlineForm) ->
      $scope.selectedItem = item
      $scope.selectedItemInlineForm = inlineForm

    $scope.remove = ->
      $("#cm").removeClass "open"
      directoryService.deleteItem $scope.selectedItem.$modelValue
      $scope.selectedItem.remove()

    $scope.renameClick = ->
      $scope.selectedItemInlineForm.$show()

    $scope.compress = ->
      directoryService.compressItem($scope.selectedItem.$modelValue).then() ->
        parent = undefined
        parent = $scope.getParent($scope.selectedItem)
        $scope.refreshFolder parent


    $scope.saveRename = (newName, item) ->
      return  if item.name is newName
      item.name = newName
      item.path = $scope.itemPath(item)
      directoryService.getItem(item.id).then (freshItem) ->
        freshItem.name = item.name
        freshItem.path = item.path
        directoryService.saveItem(freshItem).then (freshItem) ->
          item.id = freshItem.id
          item.children = freshItem.children
          $scope.buildChildMap()



    $scope.onFolderClick = (item) ->
      if item.collapsed
        $scope.expandFolder item
        $scope.refreshFolder item
      else
        $scope.collapseFolder item

    $scope.onFileClick = (item) ->
      if item.$modelValue.path.endsWith(".html") or item.$modelValue.path.endsWith(".css") or item.$modelValue.path.endsWith(".js") or item.$modelValue.path.endsWith(".json") or item.$modelValue.path.endsWith(".txt")
        $location.path "/contents/" + item.$modelValue.id + "/edit"
      else
        $location.path "/contents/" + item.$modelValue.id + "/view"

    $scope.onFileSelectClick = (item) ->
      $location.path "/contents/" + item.$modelValue.id + "/select"

    $scope.expandFolder = (item) ->
      item.toggle()  if item.collapsed

    $scope.collapseFolder = (item) ->
      unless item.collapsed
        item.toggle()
        $("#file-scroll").slimscroll()

    $scope.refresh = ->
      $scope.refreshFolder $scope.selectedItem
      $scope.expandFolder $scope.selectedItem

    $scope.refreshFolder = (item) ->
      directoryService.getItem(item.$modelValue.id).then (freshItem) ->
        item.$modelValue.children = freshItem.children
        $scope.buildChildMap()

      $scope.populateFirstChildren(item.$modelValue.children).then ->
        $scope.buildChildMap()

      $("#file-scroll").slimscroll()

    $scope.newFiles = ->
      $rootScope.currentFolder = $scope.selectedItem.$modelValue.path
      $location.path "/contents/newfiles"

    $scope.newSubFolder = ->
      newItem = undefined
      newItem = directoryService.newItem()
      newItem.type = "Directory"
      newItem.name = "untitled"
      $scope.selectedItem.$modelValue.children.push newItem
      $scope.buildChildMap()
      newItem.path = $scope.itemPath(newItem)
      directoryService.saveItem(newItem).then (freshItem) ->
        $scope.refreshFolder $scope.selectedItem
        $scope.expandFolder $scope.selectedItem

   ]
).call this