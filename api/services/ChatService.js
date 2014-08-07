var xmlrpc = require('xmlrpc'),
client = xmlrpc.createClient({ host: 'socialeasier.com', port: 4560});

module.exports = {
	room: {
		get: function (room, callback) {
		    client.methodCall('get_room_occupants', [{name: room.id, service: 'conference.socialeasier.com'}], function (err, result) {
		    	callback((err ? {error: err} : result));
		    });
		},

		create: function (room, callback) {
			client.methodCall('create_room', [{name: room.id, host: 'socialeasier.com', service: 'conference.socialeasier.com'}], function (err, result) {
		    	callback((err ? {error: err} : result));
		    });
		},

		update: function (room, values) {

		},

		remove: function (room) {

		},

		paticipants: function (room) {

		},

		createUser: function (user, callback) {
			
		},

		removeUser: function (user, callback) {
			
		}
	},

	rooms: {
		list: function (callback) {
			
		}
	}
}