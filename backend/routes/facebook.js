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

    Q.ninvoke(facebookSvc, 'getUserInfo', token)
      .then(function (userFbInfo) {
        Q.ninvoke(usersSvc, 'getByFbId', userFbInfo.id)
          .then(function (user) {
            if (user !== null) {
              return user;
            }
            var userData = {
              token: token,
              facebook_id: userFbInfo.id,
              email: userFbInfo.email
            };
            return Q.ninvoke(usersSvc, 'createInfo', userData)
              .then(function (users) {
                user = users[0];
                return Q.ninvoke(facebookSvc, 'getUserFriends', token);
              })
              .then(function (friendsInfo) {
                var friendIds = [];

                friendsInfo.forEach(function (friend) {
                  friendIds.push(friendIds.id);
                });

                return Q.npost(friendsSvc, 'createInfo', [friendIds, user.id]);
              })
              .then(function (friendIds) {
                res.json(200, user);
              })
              .fail(function (err) {
                res.send(500);
              });
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
