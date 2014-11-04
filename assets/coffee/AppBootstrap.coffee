window.app = {}

class Bootstrap

	constructor: ->
		@router = new Router()
		@bindEvents()
		@setRoutes()
		@controller = {
			name: null
			instance: null
		};

	bindEvents: ->
		_this = @

		callback =->
			_this.router.run()
			return

		window.addEventListener("hashchange", callback, false)
		return

	getAction: (options) ->
		_this = @
		@controller.instance = if @controller.name == params.controller then @controller.instance else new window.app.controller[params.controller]()

		callback = (params) ->
			if options.method
				_this.controller.name = options.method
				_this.controller.instance[options.method](params)

	setRoutes: ->
		routes = @getRoutes()

		for key, value of routes
			action =->

			if value instanceof Object
				action = getAction(value)
			else if value instanceof Function
				action = value

			@setRoute(key, action)
			

		return

	setRoute: (route, callback) ->
		@router.add(route, value)

	getRoutes: ->
		window.app.routes

$ =>
	window.app.bootstrap = new Bootstrap()
	return
	