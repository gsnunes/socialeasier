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

		create: function (room, values) {
			console.log('create');
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