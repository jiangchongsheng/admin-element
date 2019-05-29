'use strict'
require('./check-versions')()  // 检查 Node 和 npm 版本

process.env.NODE_ENV = 'production'

// 一个可以强制打开浏览器并跳转到指定 url 的插件
const ora = require('ora')
const rm = require('rimraf')
// 使用 NodeJS 自带的文件路径工具
const path = require('path')
const chalk = require('chalk')
// 使用 webpack
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.test.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
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
