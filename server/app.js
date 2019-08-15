const Koa = require('koa')
const app = new Koa()
const views = require('koa-views') // 用于 koa@2 的模板呈现中间件
const json = require('koa-json') // JSON 漂亮打印响应中间件
const onerror = require('koa-onerror') // 一个用于 koa 的错误处理程序
const bodyparser = require('koa-bodyparser') // 针对请求报文的处理 一个基于co-body的koa体解析器。支持json，表单和文本类型的主体。
const logger = require('koa-logger') // 用于koa的开发风格日志记录器中间件。
const session = require('koa-generic-session') // Koa通用的session中间件
const mongoose = require('mongoose')
const Redis = require('koa-redis') // Redis存储用于Koa会话中间件/缓存，支持前哨和集群

const users = require('./interface/users')
const goods = require('./interface/goods')
const sellers = require('./interface/sellers')
const csellers = require('./interface/csellers')
const ratings = require('./interface/ratings')
const homes = require('./interface/homes')
const merchants = require('./interface/merchants')
const cmerchants = require('./interface/cmerchants')
const orders = require('./interface/orders')
const locations = require('./interface/locations')

const passport = require('./interface/utils/passport')
const dbConfig = require('./dbs/config')

// error handler
onerror(app)

// session
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(
  session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
  })
)
// open koa-passport Support for session
app.use(passport.initialize())
app.use(passport.session())

mongoose.set('useCreateIndex', true)
// Connect to the database
mongoose.connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  }
)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(sellers.routes(), sellers.allowedMethods())
app.use(csellers.routes(), csellers.allowedMethods())
app.use(ratings.routes(), ratings.allowedMethods())
app.use(homes.routes(), homes.allowedMethods())
app.use(merchants.routes(), merchants.allowedMethods())
app.use(cmerchants.routes(), cmerchants.allowedMethods())
app.use(orders.routes(), orders.allowedMethods())
app.use(locations.routes(), locations.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
