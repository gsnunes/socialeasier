var http = require('http'),

parseString = require('xml2js').parseString,

host = 'socialeasier.com',

plugins = {
	muc: {
		host: host,
		path: '/plugins/mucservice/chatrooms',
		port: '9090',
		headers: {'Authorization': 'Basic YWRtaW46c29jaWFsZWFzaWVyMTIz'}
	},

	user: {
		host: host,
		path: '/plugins/userService/userservice',
		port: '9090'
	}
},

setReq = function (options, callback) {
	var req = http.request(options, function (res) {
		var str = [];

		res.on('data', function (chunk) {
			str.push(chunk);
		});

		res.on('end', function () {
			parseString(str.join(), function (err, data) {
				callback(data);
			});
		});
	});

	req.end();
}

module.exports = {
	room: {
		get: function (room, callback) {
			var options = Object.create(plugins.muc);
			options.path += '/' + room;

			var req = http.request(options, function (res) {
				var str = [];

				res.on('data', function (chunk) {
					str.push(chunk);
				});

				res.on('end', function () {
					parseString(str.join(), function (err, data) {
						callback(data);
					});
				});
			});

			req.end();
		},

		create: function (room, values, callback) {
			var options = new Object(plugins.muc);
			options.method = 'POST';
			options.headers['Content-Type'] = 'application/xml';

			console.log('options', options);

			var req = http.request(options, function (res) {
				var str = [];

				res.on('data', function (chunk) {
					console.log(chunk);
					str.push(chunk);
				});

				res.on('end', function () {
					parseString(str.join(), function (err, data) {
						callback(data);
					});
				});
			});
			var payload =  '<chatRoom> <admins/> <broadcastPresenceRoles> <broadcastPresenceRole>moderator</broadcastPresenceRole> <broadcastPresenceRole>participant</broadcastPresenceRole> <broadcastPresenceRole>visitor</broadcastPresenceRole> </broadcastPresenceRoles> <canAnyoneDiscoverJID>true</canAnyoneDiscoverJID> <canChangeNickname>true</canChangeNickname> <canOccupantsChangeSubject>false</canOccupantsChangeSubject> <canOccupantsInvite>false</canOccupantsInvite> <creationDate>2014-07-16T16:54:22.350Z</creationDate> <description>test</description> <logEnabled>true</logEnabled> <loginRestrictedToNickname>false</loginRestrictedToNickname> <maxUsers>30</maxUsers> <members> <member>test2@socialeasier.com</member> <member>test1@socialeasier.com</member> </members> <membersOnly>false</membersOnly> <moderated>false</moderated> <modificationDate>2014-07-16T16:54:22.372Z</modificationDate> <naturalName>' + room + '</naturalName> <outcasts/> <owners> <owner>admin@socialeasier.com</owner> </owners> <persistent>true</persistent> <publicRoom>true</publicRoom> <registrationEnabled>true</registrationEnabled> <roomName>'+ room +'</roomName> </chatRoom>';

			req.write(payload);
			req.end();

		},

		update: function (room, values) {
			console.log('update');
		},

		remove: function (room) {
			console.log('remove');
		},

		paticipants: function (room) {
			console.log('paticipants');
		},

		addUser: function (user, callback) {
			var options = Object.create(plugins.user);
			options.path += '?type=add&secret=socialeasier&username=' + user.username + '&password=' + user.pass + '&name=' + user.name + '&email=' + user.mail;
			setReq(options, callback);
		},

		removeUser: function (user, callback) {
			var options = Object.create(plugins.user);
			options.path += '?type=delete&secret=socialeasier&username=' + user.username;
			setReq(options, callback);
		}
	},

	rooms: {
		list: function (callback) {
			console.log(plugins.muc);
			var req = http.request(plugins.muc, function (res) {
				var str = [];

				res.on('data', function (chunk) {
					str.push(chunk);
				});

				res.on('end', function () {
					parseString(str.join(), function (err, data) {
						callback(data);
					});
				});
			});

			req.end();
		}
	}
}