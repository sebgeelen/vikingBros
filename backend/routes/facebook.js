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
      res.send(500, err);
      return;
    }
    Q.ninvoke(facebookSvc, 'getUserInfo', token)
      .then(function (userFbInfo) {
        console.log('USER INFO: %j', userFbInfo);
        Q.ninvoke(usersSvc, 'getInfoByFbId', userFbInfo.id)
          .then(function (user) {
            console.log('USER: %j', user);
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
                console.log('USERS: %j', users);
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
