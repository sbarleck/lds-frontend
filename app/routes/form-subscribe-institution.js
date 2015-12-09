var path = require('path');

module.exports = function(baseHandler) {

    var router = baseHandler.express.Router();

    router.get('/', baseHandler.handlingResponse(baseHandler.handlingRender, {view: 'subscribe-institution'}));
    
    router.post('/', baseHandler.handlingResponse(baseHandler.handlingRequest, {uri: '/instituicao', body: true, 'key': 'instituicao'}));
    
    baseHandler.app.use('/cadastro-instituicao', router);

};
