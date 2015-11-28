var path = require('path');

module.exports = function(baseHandler) {

    var router = baseHandler.express.Router();
    var router2 = baseHandler.express.Router();

    router.get('/', baseHandler.handlingResponse(baseHandler.handlingRender, {view: 'index'}));

    router.get('/instituicao/proximos/', baseHandler.handlingResponse(baseHandler.handlingRequest, {uri: '/instituicao/near', body: true, 'key': 'instituicoes'}));

    baseHandler.app.use('/', router);
    baseHandler.app.use('/instituicao/proximos', router2);

};
