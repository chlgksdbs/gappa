
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use('/api',
        createProxyMiddleware(
            {
                target: 'http://j9b206.p.ssafy.io:8080',
                changeOrigin: true,
            }
        )
    )
}