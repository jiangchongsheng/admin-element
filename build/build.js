'use strict'
require('./check-versions')()

// 当node无法判断是本地还是线上时，这里默认写上线上
process.env.NODE_ENV = 'production'

// 一个很好看的 loading 插件
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')

// 加载 webpack.prod.conf文件
const webpackConfig = require('./webpack.prod.conf')
// 使用 ora 打印出 loading + log
const spinner = ora('building for production...')
// 开始 loading 动画
spinner.start()

// 删除打包后的文件夹，重新生成打包后的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
   //  开始 webpack 的编译
  webpack(webpackConfig, (err, stats) => {
    // 编译成功的回调函数
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    )
  })
})
