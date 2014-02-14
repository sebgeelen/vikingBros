var userService      = require('../services/users');
var friendService      = require('../services/friends');

function getInfo(req, res){
	userService.getInfo(req.param('id'), function (err, data){
		if (err){
			res.send(500, err)
			return;
		}
		res.json(200, data);
	});
}

function setInfo(req, res){
	userService.setInfo(req.body, req.param('id'), function (err, data){
		if (err){
			res.send(500, err)
			return;
		}
		res.json(200, data);
	});
}


function createInfo(req, res){
	userService.createInfo(req.body, function (err, data){
		if (err){
			res.send(500, err)
			return;
		}
		res.json(200, data);
	});
}

function getFriends(req, res){
	friendService.getFriends(req.param('id'), function (err, data){
		if (err){
			res.send(500, err)
			return;
		}
		res.json(200, data);
	});
}

function setFriends(req, res){
	friendService.getFriends(req.body, req.param('id'), function (err, data){
		if (err){
			res.send(500, err)
			return;
		}
		res.json(200, data);
	});
}


function createFriendLink(req, res){
	friendService.createFriendLink(req.body, function (err, data){
		if (err){
			res.send(500, err)
			return;
		}
		res.json(200, data);
	});
}



module.exports = {
  getInfo: getInfo,
  setInfo: setInfo,
  createInfo: createInfo,
  getFriends: getFriends,
  setFriends: setFriends,
  createFriendLink: createFriendLink
};
