'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
// .vue 文件配置 loader 及工具 (autoprefixer)
const vueLoaderConfig = require('./vue-loader.conf')

// 方便对import时引入地址的方便填写 拼接我们的工作区路径为一个绝对路径的函数
function resolve(dir) {
  return path.join(__dirname, '..', dir)
  // 此时__dirname是build文件路径..代表再出去一层，就是文件的根路径，
  // 那dir这个参数则是你要传的文件夹，如果我们传src的话就是从src目录开始找
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// webpack 配置，输入、输出、模块、插件
module.exports = {
  // 运行环境的上下文，就是实际的目录
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'  // 编译入口js文件
  },
  // 输出内容，这内部的配置会根据不同的运行环境来进行变化
  output: {
    // 编译输出的根路径
    path: config.build.assetsRoot,
    // 编译输出的文件名 name对应编译入口配置的key,也就是上面的app
    filename: '[name].js',
    // 正式发布环境下编译输出的发布路径
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全的扩展名
    extensions: ['.js', '.vue', '.json'],
    // 默认路径代理，即起别名，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻
    alias: {
      '@': resolve('src')
    }
  },
  // module配置一些eslint、vue、js、图片资源、字体图标、文件等加载的loader。
  // 安装项目依赖包之后，一般都要检查rules里面是否有对应的loader配置
  module: {
    rules: [
      // 需要处理的文件及使用的 loader
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
