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

var crypto = require('crypto');

var chatController = module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChatController)
   */
  _config: {},

  index: function (req, res) {

  },

  join: function (req, res) {
  	if(!req.param('user')) {
  		res.json({error: {login: true}});
  		return;
  	}

    req.session.user = req.param('user');

  	var ip = req.connection.remoteAddress,
  	cipher = crypto.createCipher('aes256', ip),
  	room = {id: cipher.update('socialeasier', 'utf8', 'hex') + cipher.final('hex')};

  	// ChatService.room.get(room, function (data) {
   //    if(data.error) {
        ChatService.room.create(room, function(data) {
          chatController.createdRoom(data, res);
        });
      // } else {
      //   chatController.createdRoom(data, res);
      // }
  	// });
  },

  createdRoom: function (data, res) {
    res.json(data);
  }
  
};