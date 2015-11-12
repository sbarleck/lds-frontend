var express = require('express');
var path = require('path');
var request = require('request');
var app = express();

var config = require('./app/config');

app.set('views', 'views');
app.set('view engine', 'jade');

require('./app/routes')(app, express, request);

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(config.port, function() {
    console.log(server.address());
});
