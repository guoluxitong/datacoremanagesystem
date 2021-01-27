module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8088', //API服务器的地址
                secure: false,//如果是https请设置为true
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
    }
}