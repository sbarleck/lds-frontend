var fs     = require('fs');
var path   = require('path');
var dir    = 'routes/';

var baseHandler = {};

function handlingError() {
  return function(err, files) {
    if(err) {
      return console.error('Error: %s', err);
    }
    files.forEach(requiringFile);
  }
}

function requiringFile(file) {
  require('./' + dir + file)(baseHandler);
}

module.exports = function(application, express, request, config) {

  baseHandler.app     = application;
  baseHandler.express = express;
  baseHandler.request = request;
  baseHandler.config  = config;

  fs.readdir(path.join(__dirname, dir), handlingError());

};
