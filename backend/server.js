'use strict'

process.env.TZ = 'Europe/Brussels';

var express = require('express');
var app = express();
var port = process.env.PORT || 80;

app.use(express.compress());
app.use(express.static(__dirname + '/view'/*, { maxAge: 86400000 } */)); // 1 day max age

app.configure(function () {

  var facebook = require('./routes/facebook');

  // routes
  app.get('/facebook', facebook.getAuthUrl);
});

app.listen(process.env.PORT || 80);

console.log('Listening on port %d', port);
