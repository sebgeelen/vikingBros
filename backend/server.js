'use strict'

process.env.TZ = 'Europe/Brussels';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.compress());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/../view'/*, { maxAge: 86400000 } */)); // 1 day max age

app.configure(function () {

  var facebook = require('./routes/facebook');
  var users = require('./routes/users');

  // routes
  app.get('/api/facebook', facebook.getAuthUrl);
  app.post('/api/facebook', facebook.createUserFromFbCode);
  app.get('/api/users/:id', users.getInfo);
	app.put('/api/users/:id', users.setInfo);
  app.get('/api/friendlist/:id', users.getFriends);
/*  app.get('/api/test', users.test)*/
});

app.listen(port);

console.log('Listening on port %d', port);
