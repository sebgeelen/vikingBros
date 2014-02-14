var mysql  = require('mysql');
var config = require('config');

var pool = null;

function getConnection(callback) {
    if (!pool) {

        log.info('Connecting to ' + config.mysql.host + ' with ' + config.mysql.user);

        pool = mysql.createPool(config.mysql);

    }

    return pool.getConnection(callback);
}

module.exports = {
  getConnection: getConnection
};
