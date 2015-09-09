"use strict"
angular.module("app.directory.services", []).service "directoryService", [
	"Restangular"
	"logger"
	(Restangular, logger) ->
		return (
			newItem: ->
				id: ""
				name: ""
				path: ""
				type: ""
				children: []

			getItems: ->
				Restangular.all("directory").getList()

			getItem: (id) ->
				Restangular.one("directory", id).get()

			saveItem: (item) ->
				if item.id
					item.put()
				else
					Restangular.all("directory").post item

			deleteItem: (item) ->
				Restangular.one("directory", item.id).remove()

			compressItem: (item) ->
				Restangular.one("directory", item.id).customPOST(item, "compress", {}, {})
		)
]
