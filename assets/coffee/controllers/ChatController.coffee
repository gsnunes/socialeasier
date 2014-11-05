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
		console.log('login')
		$('body').addClass('side-bar-opened')

window.app.controllers.ChatController = ChatController