### 
Based on coffeescript-router (https://github.com/tbugai/coffeescript-router)
###
class Router
	constructor: ->
		@page = null
		@routes = []

	buildRegexString: (path) ->
    	path.replace(/\//g, "\\/").replace(/:([A-Za-z0-9_]*)/g,"([A-Za-z0-9_]*)")

	setPage: (@page) ->

	getPage: ->
		@page

	add: (path, callback) ->
		@routes.push {
			params: path.match(/:([A-Za-z0-9_]*)/g)
			regex: new RegExp(@buildRegexString(path))
			callback: callback
		}

	run: (path = window.location.pathname) ->
		console.log('run')
		for route in @routes
			results = path.match(route.regex)

			if route?
				index = 1
				namedParams = {}
				if route.params?
					for name in route.params
						namedParams[name.slice(1)] = results[index++]
				route.callback(namedParams)
				return