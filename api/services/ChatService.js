var http = require('http'),

parseString = require('xml2js').parseString,

host = 'socialeasier.com',

muc = {
	host: host,
	path: '/plugins/mucservice/chatrooms',
	port: '9090',
	headers: {'Authorization': 'Basic YWRtaW46c29jaWFsZWFzaWVyMTIz'}
},

user = {
	host: host,
	path: '/plugins/userService/userservice',
	port: '9090'
}

module.exports = {
	room: {
		get: function (room, callback) {
			var options = Object.create(muc);
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
		}
	},

	rooms: {
		list: function (callback) {
			var req = http.request(muc, function (res) {
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