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

module.exports = {
    
  

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChatController)
   */
  _config: {},

  ipRooms: [],
  rooms: [],
  
  index: function (req, res) {
  	if(!this.ipRooms) {
  		this.ipRooms = [];
  	}

  	if(!this.rooms) {
  		this.rooms = [];
  	}

  	this.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  	index = this.ipRooms.indexOf(ip);
  	
  	if(index == -1) {
  		this.ipRooms.push(ip);
  		this.rooms.push({ip: ip, count: 1});
  	} else {
  		this.rooms[index].count++;
  	}
  	console.log(this.rooms);
    res.view({});
  },

  room: function () {

  },

  socket: function (req, res) {
  	var index = this.ipRooms.indexOf(this.ip);

  	// Get the value of a parameter
    var param = req.param('message');

    // Send a JSON response
    res.json({
      success: true,
      message: param,
      count: this.rooms[index].count,
      ip: this.ip
    });
  }
  
};
