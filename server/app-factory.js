/* Modules */
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var config = require('./config.json');
var routes = require('./routes');

var app = express();

/* Configuration */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/artist', routes.artists.list);
app.get('/artist/:artist', routes.artists.show);

module.exports = app;