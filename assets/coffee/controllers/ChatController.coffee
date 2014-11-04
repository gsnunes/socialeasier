class ChatController extends AppController
	constructor: ->
		@bindEvents()

	bindEvents: ->
		that = @
		$('h1').click ->
			that.toggleSideBar()

	toggleSideBar: ->
		$('body').toggleClass('side-bar-opened')

	login: ->
		$('body').add('side-bar-opened')

window.app.controller = ChatController