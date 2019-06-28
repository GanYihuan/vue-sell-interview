const webpack = require('webpack')
const path = require('path')
const appData = require('./public/data')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings
const home = appData.home
const merchant = appData.merchant

module.exports = {
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  // 用于嵌套生成的静态资产（js，css，img，fonts）的目录。
  // assetsDir: '',
  // 以多页模式构建应用程序。
  pages: undefined,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建。
  runtimeCompiler: false,
  // 默认情况下babel-loader忽略其中的所有文件node_modules。
  transpileDependencies: [],
  // 生产环境sourceMap
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('api', path.join(__dirname, 'src/api'))
      .set('assets', path.join(__dirname, 'src/assets'))
      .set('components', path.join(__dirname, 'src/components'))
      .set('pages', path.join(__dirname, 'src/pages'))
      .set('utils', path.join(__dirname, 'src/utils'))
      .set('store', path.join(__dirname, 'src/store'))
    // 处理moment加载多个语言文件问题
    config
      .plugin('context')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true, // 打开浏览器
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: {
      '/users': {
        target: 'http://localhost:3000' // 配置代理
      },
      '/goods': {
        target: 'http://localhost:3000' // 配置代理
      },
      '/seller': {
        target: 'http://localhost:3000' // 配置代理
      },
      '/ratings': {
        target: 'http://localhost:3000' // 配置代理
      },
      '/homes': {
        target: 'http://localhost:3000' // 配置代理
      },
      '/merchants': {
        target: 'http://localhost:3000' // 配置代理
      }
    }, // 设置代理
    before: app => {
      app.get('/api/seller', (req, res) => {
        const id = req.query.id
        res.json({
          status: 1,
          data: Object.assign({}, seller, { id })
        })
      })
      app.get('/api/goods', (req, res) => {
        res.json({
          status: 1,
          data: goods
        })
      })
      app.get('/api/ratings', (req, res) => {
        res.json({
          status: 1,
          data: ratings
        })
      })
      app.get('/api/home', (req, res) => {
        res.json({
          status: 1,
          data: home
        })
      })
      app.get('/api/merchant', (req, res) => {
        res.json({
          status: 1,
          data: merchant
        })
      })
    }
  }
}
