'use strict';

var Q = require('q');
var facebookSvc = require('../services/facebook');
var usersSvc = require('../services/users');
var friendsSvc = require('../services/friends');

function getAuthUrl(req, res) {
  res.json(200, facebookSvc.getAuthUrl());
}

function createUserFromFbCode(req, res) {
  facebookSvc.fetchToken(req.body.code, function (err, token) {
    if (err) {
      res.send(500);
      return;
    }

    var promises = [
      Q.ninvoke(facebookSvc, 'getUserInfo', token)
        .then(function (err, userInfo) {

        }),
      Q.ninvoke(facebookSvc, 'getUserFriends', token)
        .then(function (err, userInfo) {

        })
    ];

    Q.all(promises)
      .then(function (results) {
        res.json(200, {
          id: 1,
          token: token
        });
      })
      .fail(function (err) {
        res.send(500);
      });
  });
}

module.exports = {
  getAuthUrl: getAuthUrl,
  createUserFromFbCode: createUserFromFbCode
};
