var fs     = require('fs');
var path   = require('path');
var dir    = 'routes/';
var define = {app: undefined, express: undefined, request: undefined};

function handlingError() {
  return function(err, files) {
    if(err) {
      return console.error('Error: %s', err);
    }
    files.forEach(requiringFile);
  }
}

function requiringFile(file) {
  require('./' + dir + file)(define.app, define.express, define.request);
}

module.exports = function(application, express, request) {

  define.app = application;
  define.express = express;
  define.request = request;

  fs.readdir(path.join(__dirname, dir), handlingError());

};
