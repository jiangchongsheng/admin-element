'use strict' //js按照严格模式执行
// path
const path = require('path')
// 使用一些小工具
const utils = require('./utils')
const webpack = require('webpack')
// 同样的使用了 config/index.js 的预设配置
const config = require('../config')
// 使用 webpack 配置合并插件
const merge = require('webpack-merge')
// 加载 webpack.base.conf
const baseWebpackConfig = require('./webpack.base.conf')
// 使用 html-webpack-plugin 插件，这个插件可以帮我们自动生成 html 并且注入到 .html 文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 一个友好的错误提示插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// 主机
const HOST = process.env.HOST   // 无值(内无HOST)
// 端口
const PORT = process.env.PORT && Number(process.env.PORT)    // 无值(内无PORT)


// 下面是合并配置对象，将这个配置文件特有的配置添加替换到base配置文件中
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // 开发工具 用来调试
  devtool: config.dev.devtool,

  // webpack服务器配置  如需要请求本地数据时  需要在此块添加其他配置
  devServer: {
    // 重新加载server,控制台以warning方式提示错误
    // 使用内联模式时，在开发工具的控制台将显示消息，可取的值有none error warning info
    clientLogLevel: 'warning',
    historyApiFallback: true,
    // 启用热替换 这个功能主要是用于开发过程中，对生产环境无帮助。效果上就是界面无刷新更新。
    hot: true,
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要，这里是禁用
    contentBase:false,
    // 是否压缩
    compress: true,
    // 主机  
    host: HOST || config.dev.host,
    // 端口
    port: PORT || config.dev.port,
    // 是否自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 编译出错时是否有提示
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 静态资源路径 此路径可在浏览器中打开
    publicPath: config.dev.assetsPublicPath,
    // 代理
    proxy: config.dev.proxyTable,
    // 启用quiet 意思是除了启动信息以外的任何信息都不会打印在控制台
    quiet: true, 
    // 监视文件的选项
    watchOptions: {
      poll: config.dev.poll // 是否使用轮询
    }
  },
  plugins: [
    // 自定义一个plugin 生成当前环境的一个变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    //该插件可以使页面有更新时重绘变更的模块，不会重加载整个页面
    new webpack.HotModuleReplacementPlugin(),
    // // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    new HtmlWebpackPlugin({ //模块HtmlWebpackPlugin
      // 输出的HTML文件名
      filename: 'index.html',
      // 模板文件路径
      template: 'index.html',
      // 设置为true或body将js代码加到<body>元素结束前
      // 设置为head将js代码加到<head>里面
      // 设置为false所有静态资源css和JavaScript都不会注入到模板文件中
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'vue-element-admin'
    })
  ]
})


// webpack将运行由配置文件导出的函数，并且等待promise返回，便于需要异步地加载所需的配置变量
module.exports = new Promise((resolve, reject) => {
   // 获取basePort (dev 端口)
  portfinder.basePort = process.env.PORT || config.dev.port
  // 端口配置
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // 添加友好提示 
      devWebpackConfig.plugins.push( // 出错友好处理插件
        new FriendlyErrorsPlugin({ 
          // 编译成功提示
          compilationSuccessInfo: { 
            // 提示运行的主机和端口
            messages: [
              `您的运行地址为: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors // 如果出错就执行这块,其实是utils里面配置好的提示信息
            ? utils.createNotifierCallback()
            : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
