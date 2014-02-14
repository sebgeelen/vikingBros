var mysql      = require('../resources/mysql');


function getFriends(userId, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}
		connection.query('SELECT * FROM users WHERE id IN (SELECT friend_id FROM friends WHERE user_id = ?)', [userId], function(err, rows, fields) {
			if (err){
				callback(err, null);
				return;
			}
			connection.release();
			callback(null, rows);
		});			
	})
}

// userData = {"user_id": 2, "friend_id": 1}
function setFriendLink(userData, userId, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}
		connection.query('UPDATE friends SET ? WHERE user_id = ?', [userData, userId], function(err, rows, fields) {
			if (err){
				callback(err, null);
				return;
			}
			connection.release();
			callback(null, rows);
		});			
	})
}

function createFriendLink(facebookIdList, userId, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}

		connection.query('SELECT id FROM users WHERE facebook_id IN (?)', [facebookIdList], function(err, rows, fields) {
			if (err){
				console.log("TEST 1");
				callback(err, null);
				return;
			}
			for(var key in rows){
				connection.query('INSERT INTO friends SET ?', {user_id : userId, friend_id : rows[key].id}, function(err2, rows2, fields2) {
					console.log("TEST 2");
				});
				connection.query('INSERT INTO friends SET ?', {user_id : rows[key].id, friend_id : userId}, function(err3, rows3, fields3) {
					console.log("TEST 3");
				});
			}
			callback(err, null);
			connection.release();
		});			
	})
}



module.exports = {
  getFriends: getFriends,
  setFriendLink: setFriendLink,
  createFriendLink: createFriendLink
};
