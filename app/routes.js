var fs          = require('fs');
var path        = require('path');
var dir         = 'routes/';

var baseHandler = {};

baseHandler.handlingResponse = function(callback, atributes) {
    return function(req, res) {
        callback(res, atributes);
    }
};

baseHandler.handlingRequest = function(res, atributes) {
    baseHandler.request(baseHandler.config.webservice + atributes.uri, baseHandler.handlingError(res, atributes));
};

baseHandler.handlingError = function(res, atributes) {
    return function(err, response, body) {
        var result = {}

        result.pageTitle = baseHandler.config.pageTitle;
        result[atributes.key] = JSON.parse(body);

        res.render(atributes.view, result);
    }
};

/*
    * Percorre todos arquivos da pasta routes e da um require
*/

function getFiles(application, express, request, config) {

    baseHandler.app     = application;
    baseHandler.express = express;
    baseHandler.request = request;
    baseHandler.config  = config;

    fs.readdir(path.join(__dirname, dir), handlingError());

};

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

module.exports = getFiles;
