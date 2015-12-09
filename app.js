var express = require('express');
var path    = require('path');
var request = require('request');
var app     = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var config  = require('./app/config');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.set('views', 'views');
app.set('view engine', 'jade');

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('geolocation', function(data) {
        io.emit('saved_geo', data);
    });
});

require('./app/routes')(app, express, request, config, io);

app.use(express.static(path.join(__dirname, 'static')));

var server = app.listen(config.port, function() {
    console.log(server.address());
});

io.listen(server);
