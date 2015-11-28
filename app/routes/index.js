var path = require('path');

module.exports = function(baseHandler) {

    var router = baseHandler.express.Router();

    router.get('/', baseHandler.handlingResponse(baseHandler.handlingRequest, {uri: '/instituicao/near', body: baseHandler.config.defaultGeo, key: 'instituicoes', view: 'index'}));

    baseHandler.app.use('/', router);

};
