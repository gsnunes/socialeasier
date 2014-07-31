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

module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChatController)
   */
  _config: {},

  index: function (req, res) {
    // res.redirect('/#/chat');
    // ChatService.room.create('room2', {}, function (data) {
    //   console.log('Created', data);
      ChatService.rooms.list(function (list) {
        console.log(list);
        res.json({list: list});
      });
    // });
  },

  join: function (req, res) {
  	if(!req.param('user')) {
  		res.json({error: {login: true}});
  		return;
  	}

  	var ip = req.connection.remoteAddress,
  	cipher = crypto.createCipher('aes256', ip),
  	room = cipher.update('socialeasier', 'utf8', 'hex') + cipher.final('hex');
    
  	if(req.session.user) {
  		res.json({room: req.session.room, user: req.session.user});
  		return;
  	}

  	ChatService.room.get(room, function (data) {
      console.log('get', data);
  		if(data.error) {
  			ChatService.room.create(room, {}, function () {
          ChatService.rooms.list(function (list) {
            res.json(list);
          });
  			});
  		}
  	});

  	res.json({});

  }
  
};