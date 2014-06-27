/**
 * ChatController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var ChatController = {
    
  

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChatController)
   */
  _config: {},

  ipRooms: [],
  rooms: [],
  ip: null,

  index: function (req, res) {
  	ChatController.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  	index = ChatController.ipRooms.indexOf(ChatController.ip);

  	if(index == -1) {
      ChatController._createRoom(req);
  	} else if(!req.session.user) {
      ChatController._addMember(index, req);
    }

  	console.log(ChatController.rooms);
    res.view();
  },

  _addMember: function (roomIndex, req) {
    ChatController.rooms[roomIndex].members.push(ChatController._getNewMember(req));
  },

  _getNewMember: function (req) {
    var user = {id: Math.random(), name: 'Guest'};
    req.session.user = user;

    return user;
  },

  _createRoom: function (req) {
    ChatController.ipRooms.push(ChatController.ip);
    ChatController.rooms.push({
      ip: ChatController.ip,
      members: [(ChatController._getNewMember(req))]
    });
  },

  _destroyRoom: function (id) {

  },

  socket: function (req, res) {
    var index = ChatController.ipRooms.indexOf(ChatController.ip);
    
    // Get the value of a parameter
    var param = req.param('message');

    var data = {
      success: true,
      param: param,
      members: ChatController.rooms[index].members,
      ip: ChatController.ip
    }

    console.log(data);

    // Send a JSON response
    res.json(data);
  }
  
};

module.exports = ChatController;
