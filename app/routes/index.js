var path = require('path');

module.exports = function(baseHandler) {

    var router = baseHandler.express.Router();

    function handlingResponse(callback, atributes) {
        return function(req, res) {
            callback(res, atributes);
        }
    }

    function handlingRequest(res, atributes) {
        baseHandler.request(baseHandler.config.webservice + atributes.uri, handlingError(res, atributes));
    }

    function handlingError(res, atributes) {
        return function(err, response, body) {
            var result = {}

            result.pageTitle = baseHandler.config.pageTitle;
            result[atributes.key] = JSON.parse(body);

            console.log(result);

            res.render(atributes.view, result);
        }
    }

    router.get('/', handlingResponse(handlingRequest, {uri: '/instituicao', key: 'instituicoes', view: 'index'}));

    // router.get('/', function(require, response) {
    //     request('http://localhost:8080/linha-instituicao', function(err, res, body) {
    //         var result = JSON.parse(body)['_embedded']['linha_instituicao'];
    //         response.render('index', {pageTitle: 'Linha de Saúde', instituicoes: result});
    //     });
    // });

    baseHandler.app.use('/', router);

};
