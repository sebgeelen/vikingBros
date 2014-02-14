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

// userData = {"user_id": 2, "friend_id": 1}
function createFriendLink(userData, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}
		connection.query('INSERT INTO friends SET ?', [userData], function(err, rows, fields) {
			if (err){
				callback(err, null);
				return;
			}
			connection.release();
			callback(null, rows);
		});			
	})
}

module.exports = {
  getFriends: getFriends,
  setFriendLink: setFriendLink,
  createFriendLink: createFriendLink
};
