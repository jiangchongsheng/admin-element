'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths // 编译输出的二级目录
    assetsSubDirectory: 'static',
    // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // 需要 proxyTable 代理的接口（可跨域）
    proxyTable: {
      '/': {
        // 开发环境
        target: 'http://127.0.0.1:8088',
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
     // 运行测试页面的端口
    port: 9876, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // 是否自动打开浏览器
    autoOpenBrowser: true, 
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-source-map',

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
     // 是否开启 cssSourceMap
    cssSourceMap: false
  },

  // production 环境
  build: {
    // index,assetsRoot两个路径基本不用改动，只是用于文件打包存放的路径
    // index.html的路径
    index: path.resolve(__dirname, '../dist/index.html'),
    // js,css,fonts夹等资源的路径
    // Paths // 编译输出的静态资源根路径
    assetsRoot: path.resolve(__dirname, '../dist'),

    // 编译输出的二级目录
    // 下面这种写法指定静态文件 js/css夹等与index平级
    // 指定为'/' 会打包会出现错误，最高只能指定到当前目录’./'  指定目录不存在会自动创建
    // 也就是说js,css文件夹的路径其实是上面的: ’../dist' + assetsSubDirectory
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
    // index.html中引用资源的前缀
    // 相当于static/js/app.js的前缀 eg： ./static/js...     /static/js.....
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    
     // 是否开启 cssSourceMap
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin

     // 是否开启 gzip
    productionGzip: false,
    // 需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off

    // 插件叫做bundleAnalyzerReport，上面有几行注释，讲的是只要在打包的时候输入
    // npm run build --report,就可以在打包的同时查看每个打包生成的js，
    // 里面的库的构成情况，方便我们进行相关的删减，比如有的库太大了，
    // 是否可以自己实现，有的库是否有必要，可否删除之类
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
