class ChatController extends AppController
	constructor: ->
		super
		@bindEvents()

	bindEvents: ->
		that = @
		$('h1').click ->
			that.toggleSideBar()

	toggleSideBar: ->
		$('body').toggleClass('side-bar-opened')

app = new ChatController