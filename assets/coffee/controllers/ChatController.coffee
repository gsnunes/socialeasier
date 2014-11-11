class ChatController extends AppController
	constructor: ->
		$('body').removeClass 'side-bar-opened'
		tpl = new HbsWidget '#user-options-tpl', {}
		$('.side-bar').html tpl.getElement()
		@user = @getUserInfo()
		@bindEvents()

		if @user
			@startChat()
		else
			window.location.hash = '/login'

	startChat: ->
		console.log 'startChat'

	getUserInfo: ->
		return $.cookie 'socialeasier_username'

	setUserInfo: (username) ->
		@user = username
		$.cookie 'socialeasier_username', username


	bindEvents: ->
		that = @
		$('h1').click ->
			that.toggleSideBar()

		$(document).on 'click', '#btn-login', ->
			username = $('input[name="username"]').val()
			that.setUserInfo(username)
			window.location.hash = ''

	toggleSideBar: ->
		$('body').toggleClass('side-bar-opened')

	login: ->
		tpl = new HbsWidget '#login-tpl', {}
		$('.side-bar').html tpl.getElement()
		$('body').addClass('side-bar-opened')
		return

window.app.controllers.ChatController = ChatController