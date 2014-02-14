'use strict';

var config = require('config');
var request = require('request');
var qs = require('querystring');
var Q = require('q');
var crypto = require('crypto');

function getAuthUrl(req, res) {
  var scope = 'manage_pages,user_friends,email';
  var md5sum = crypto.createHash('md5');

  var result = {
    authUrl: 'https://www.facebook.com/dialog/oauth' + '?' + qs.stringify({
      client_id: config.facebook.appId,
      redirect_uri: config.facebook.redirectUri,
      scope: scope
      //state: md5sum.update((+ new Date()).toString(36)).digest("hex") // unique id
    })
  };

  res.json(200, result);
}

function createUserFromFbCode(req, res) {
  _fetchToken(req.body.code, function (err, token) {
    if (err) {
      res.send(500);
      return;
    }
    _getUserFriends(token, function (err, userInfo) {
      if (err) {
        res.send(500);
        return;
      }
      res.json(200, userInfo);
    });
  });
}

function _fetchToken(code, callback) {
  var tokenUrl = 'https://graph.facebook.com/oauth/access_token' + '?' + qs.stringify({
    client_id: config.facebook.appId,
    client_secret:config.facebook.secret,
    redirect_uri: config.facebook.redirectUri,
    code: code
  });

  request(tokenUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var token = body.replace('access_token=', '');
      callback(null, token); // Print the google web page.
    } else {
      callback(error, null);
    }
  });
}

function _getUserInfo(token, callback) {
  var userUrl = 'https://graph.facebook.com/me' + '?' + qs.stringify({
    access_token: token
  });

  request(userUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      callback(null, body); // Print the google web page.
    } else {
      callback(error, null);
    }
  });
}

function _getUserFriends(token, callback) {
  var friendsUrl = 'https://graph.facebook.com/me/friends' + '?' + qs.stringify({
    access_token: token
  });

  request(friendsUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      callback(null, body); // Print the google web page.
    } else {
      callback(error, null);
    }
  });
}

module.exports = {
  getAuthUrl: getAuthUrl,
  createUserFromFbCode: createUserFromFbCode
};
