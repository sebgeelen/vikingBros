

var mysql      = require('../resources/mysql');



function getInfo(req, res){
	mysql.getConnection(function(err, connection){
		if (err){
			res.send(500, err);
			return;
		}
		connection.query('SELECT * FROM users WHERE id = ?', [req.param('id')], function(err, rows, fields) {
			if (err){
				res.send(500, err);
				return;
			}
			connection.release();
			res.json(200, rows);
		});			
	})
}

module.exports = {
  getInfo: getInfo
};


//
/*
function getFriendsOfUser(user_id){

	connection.query('SELECT * FROM users WHERE id in (SELECT friend_id FROM friends WHERE user_id = ?)', [user_id], function(err, rows, fields) {
		if (err) throw err;

		console.log('His friends are:');
		for (var key in rows)
		{
			console.log('- ', rows[key].email);		
		}
	});

}
getFriendsOfUser(1);



function getScoreOfUser(user_id){

	connection.query('SELECT score_current FROM users WHERE id = ?', [user_id], function(err, rows, fields) {
		if (err) throw err;

		console.log('His score is : ');
	});
}
getScoreOfUser(1);
	


*/
