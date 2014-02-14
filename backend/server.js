var express = require('express');
var app = express();
var port = process.env.PORT || 80;

app.use(express.compress());
app.use(express.static(__dirname + '/view'/*, { maxAge: 86400000 } */)); // 1 day max age

app.get('/oauth2callback', function (req, res, next) {
  console.log(req.query);
  next();
});

app.listen(process.env.PORT || 80);

console.log('Listening on port %d', port);
