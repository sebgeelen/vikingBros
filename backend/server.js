'use strict'

process.env.TZ = 'Europe/Brussels';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.compress());
app.use(express.static(__dirname + '/view'/*, { maxAge: 86400000 } */)); // 1 day max age
app.use(express.bodyParser());

app.configure(function () {

  var facebook = require('./routes/facebook');
  var users = require('./routes/users');

  // routes
  app.get('/facebook', facebook.getAuthUrl);
  app.get('/users/:id', users.getInfo);
  app.put('/users/:id', users.setInfo);
  app.get('/friendlist/:id', users.getFriends);
});

app.listen(port);

console.log('Listening on port %d', port);
