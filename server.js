'use strict';

var express  = require('express');
var http = require('http');

// Create a new application with Express
var app = express();

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.render(__dirname + '/index.html');
});

app.get('/json', function(req, res) {
  res.render(__dirname + '/source/more-examples/json/index.html');
});

app.get('/xml', function(req, res) {
  res.render(__dirname + '/source/more-examples/xml/index.html');
});

app.get('/jquery', function(req, res) {
  res.render(__dirname + '/source/more-examples/jquery/index.html');
});

// Set the Port
app.set('port', process.env.PORT || 9000);

// Serve the static index.html from the public folder
app.use('/source', express.static(__dirname + '/source'));

// Create HTTP Server using Express
var server = http.createServer(app);

// Bind to a port and listen for connections on it
server.listen(app.get('port'), function() {
  console.log('Express HTTP server listening on port ' + app.get('port'));
});
