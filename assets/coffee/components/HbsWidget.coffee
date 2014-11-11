class HbsWidget
	constructor: (id, data) ->
		@tpl = window.Handlebars.compile($(id).html())
		@setData data

	setData: (data) ->
		@data = data
		return
	getData: ->
		@data

	getElement: ->
		@tpl @getData()

