var path = require('path');

module.exports = function(baseHandler) {

    var router = baseHandler.express.Router();

    router.get('/', baseHandler.handlingResponse(baseHandler.handlingRender, {view: 'subscribe-institution'}));

    baseHandler.app.use('/cadastro-instituicao', router);

};
