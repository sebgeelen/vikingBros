var mysql      = require('../resources/mysql');


function getInfo(userId, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}
		connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, rows, fields) {
			if (err){
				callback(err, null);
				return;
			}
			connection.release();
			callback(null, rows);
		});			
	})
}


function setInfo(userData, userId, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}
		connection.query('UPDATE users SET ? WHERE id = ?', [userData, userId], function(err, rows, fields) {
			if (err){
				callback(err, null);
				return;
			}
			connection.release();
			callback(null, rows);
		});			
	})
}

// userData = {"id": 1, "facebook_id": "test", "email": "jojimoreau@gmail.com", "token": "ezfezfezfezfez", "score_current": 23, "score_total": 455, "distance_best": 1300, "distance_total": 140000}
function createInfo(userData, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}
		connection.query('INSERT INTO users SET ?', [userData], function(err, rows, fields) {
			if (err){
				callback(err, null);
				return;
			}
			connection.release();
			callback(null, rows);
		});			
	})
}

function getInfoByFbId(userFbId, callback){
	mysql.getConnection(function(err, connection){
		if (err){
			callback(err, null);
			return;
		}
		connection.query('SELECT * FROM users WHERE facebook_id = ?', [userFbId], function(err, rows, fields) {
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
  getInfo: getInfo,
  setInfo: setInfo,
  createInfo: createInfo,
};
