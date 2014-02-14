'use strict';

var config = require('config');
var crypto = require('crypto');

function getAuthUrl(req, res) {
  var scope = 'read_insights,manage_pages,read_friendlists';
  var md5sum = crypto.createHash('md5');

  var result = {
    authUrl: 'https://www.facebook.com/dialog/oauth' +
     '?client_id=' + config.facebook.appId +
      '&redirect_uri=' + config.facebook.redirectUri +
      '&scope=' + scope +
      '&state=' + md5sum.update((+ new Date()).toString(36)).digest("hex") // unique id
  };

  res.json(200, result);
}

module.exports = {
  getAuthUrl: getAuthUrl
};
