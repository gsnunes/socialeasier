var http = require('http'),

xml2js = require('xml2js'),

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
			xml2js.parseString(str.join(), function (err, data) {
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
					xml2js.parseString(str.join(''), function (err, data) {
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
					xml2js.parseString(str.join(''), function (err, data) {
						callback(data);
					});
				});
			});

			var date = new Date();

			var payload = {
				"chatRoom": {
					"admins": {
						"admin": room.admins
					},
					"broadcastPresenceRoles": {
					  "broadcastPresenceRole": [
					    "moderator",
					    "participant",
					    "visitor"
					  ]
					},
					"canAnyoneDiscoverJID": "true",
					"canChangeNickname": "true",
					"canOccupantsChangeSubject": "false",
					"canOccupantsInvite": "false",
					"creationDate": "2014-07-16T16:54:22.372Z",
					"description": room.description,
					"logEnabled": "true",
					"loginRestrictedToNickname": "false",
					"maxUsers": 50,
					"members": {
					  "member": room.users
					},
					"membersOnly": "false",
					"moderated": "false",
					"modificationDate": "2014-07-16T16:54:22.372Z",
					"naturalName": room.id,
					"owners": { "owner": "admin@socialeasier.com" },
					"persistent": "true",
					"publicRoom": "true",
					"registrationEnabled": "true",
					"roomName": room.id
				}
			};

			var builder = new xml2js.Builder(),
			xml = builder.buildObject(payload);

			console.log(xml);

			req.write(xml);
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

		createUser: function (user, callback) {
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
			var options = new Object(plugins.muc);
			options.method = 'GET';

			var req = http.request(options, function (res) {
				var str = [];

				res.on('data', function (chunk) {
					str.push(chunk);
				});

				res.on('end', function (err, a) {
					console.log(err, a);
					xml2js.parseString(str.join(''), function (err, data) {
						console.log(data, str);
						callback(data);
					});
				});
			});

			req.end();
		}
	}
}