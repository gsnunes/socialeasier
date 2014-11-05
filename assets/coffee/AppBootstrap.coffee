window.app = {
	controllers: {}
}

class Bootstrap

	constructor: ->
		@router = new Router()
		@bindEvents()

		@controller = {
			name: null
			instance: null
		};

		@setRoutes()
		@router.run()

	bindEvents: ->
		_this = @

		callback =->
			_this.router.run()
			return

		window.addEventListener("hashchange", callback, false)
		return

	getAction: (options) ->
		_this = @
		@controller.instance = if @controller.name == options.controller then @controller.instance else new window.app.controllers[options.controller]()

		callback = (params) ->
			if options.method
				_this.controller.name = options.method
				_this.controller.instance[options.method](params)

	setRoutes: ->
		console.log('setRoutes')
		routes = @getRoutes()
		console.log(routes);
		for key, value of routes
			action =->

			if value instanceof Object
				action = @getAction(value)
			else if value instanceof Function
				action = value

			@setRoute(key, action)
			

		return

	setRoute: (route, callback) ->
		console.log(route, callback)
		@router.add(route, callback)

	getRoutes: ->
		window.app.routes

$ =>
	window.app.bootstrap = new Bootstrap()
	return
	