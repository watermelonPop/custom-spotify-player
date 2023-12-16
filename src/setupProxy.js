const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/auth/**', 
        createProxyMiddleware({ 
            target: 'https://young-atoll-11598-5b85411c229d.herokuapp.com/'
        })
    );
};
