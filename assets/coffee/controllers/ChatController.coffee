class ChatController extends AppController
	constructor: ->
		@init()

	init: ->
		$('body').removeClass 'side-bar-opened login'
		tpl = new HbsWidget '#user-options-tpl', {}
		$('.side-bar').html tpl.getElement()
		@user = @getUserInfo()
		@unbindEvents()
		@bindEvents()
		@hideLoader()

		if @user
			@startChat()
		else
			window.location.hash = '/login'

	startChat: ->
		tpl = new HbsWidget '#messages-tpl', {}
		$('.chat-content').html tpl.getElement()

	getUserInfo: ->
		return $.cookie 'socialeasier_username'

	setUserInfo: (username) ->
		@user = username
		$.cookie 'socialeasier_username', username

	unbindEvents: ->
		$(document).off()

	bindEvents: ->
		that = @
		$(document).on 'click', 'h1', ->
			that.toggleSideBar()

		$(document).on 'submit', '#form-login', (ev) ->
			username = $('input[name="username"]').val()
			that.setUserInfo(username)
			window.location.hash = ''
			ev.preventDefault()

		$(document).on 'submit', '#form-message', (ev) ->
			console.log $(@).serialize()
			that.sendMessage()
			ev.preventDefault()

		return

	sendMessage: (msg) ->
		console.log msg

	toggleSideBar: ->
		$('body').toggleClass('side-bar-opened')

	logout: ->
		$.removeCookie 'socialeasier_username'
		window.location.hash = '/login'


	login: ->
		tpl = new HbsWidget '#login-tpl', {}
		content = new HbsWidget '#info-room-tpl', {}
		$('.side-bar').html tpl.getElement()
		$('.chat-content').html content.getElement()
		$('body').addClass('side-bar-opened login')
		return

	showLoader: ->
		$('#loader').show()

	hideLoader: ->
		$('#loader').hide()

window.app.controllers.ChatController = ChatController