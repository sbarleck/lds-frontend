var fs          = require('fs');
var path        = require('path');
var dir         = 'routes/';

var baseHandler = {};

baseHandler.handlingResponse = function(callback, atributes) {
    return function(req, res) {
        if(atributes.body) {
            var result = req;
            atributes.body.forEach(function(param) {
                result = result[param];
            });
            atributes.body = result;
        }
        callback(res, atributes);
    }
};

baseHandler.handlingRequest = function(res, atributes) {
    baseHandler.request({
        url: baseHandler.config.webservice + atributes.uri,
        method: 'GET',
        body: atributes.body || null,
        json: true
    }, baseHandler.handlingError(res, atributes));
};

baseHandler.handlingError = function(res, atributes) {
    return function(err, response, body) {
        var result = {}

        result.pageTitle = baseHandler.config.pageTitle;
        result[atributes.key] = body;

        if(body) {
//            result[atributes.key] = JSON.parse(body);
        }
        if(atributes.view) {
            res.status(200).render(atributes.view, result);
        }
        else {
            res.status(200).send(result);
        }
    }
};

baseHandler.handlingRender = function(res, atributes) {
    var result = {};

    result.pageTitle = baseHandler.config.pageTitle;

    res.status(200).render(atributes.view, result);
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
    if(path.extname(file) === '.js') {
        require('./' + dir + file)(baseHandler);
    }
}

module.exports = getFiles;
