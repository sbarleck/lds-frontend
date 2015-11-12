module.exports = function(app, express, request) {

    var router = express.Router();

    router.get('/', function(require, response) {
        request('http://localhost:8080/linha-instituicao', function(err, res, body) {
            var result = JSON.parse(body)['_embedded']['linha_instituicao'];
            response.render('index', {pageTitle: 'Linha de Saúde', instituicoes: result});
        });
    });

    app.use('/', router);

};
