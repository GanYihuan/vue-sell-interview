import Koa from 'koa'
import mongoose from 'mongoose'
import consola from 'consola' // Elegant Console Logger for Node.js and Browser
import bodyParser from 'koa-bodyparser' // Parsing the middleware of the body, this.body can get the data directly in koa. Post parameter acquisition
import session from 'koa-generic-session' // supports Delay session getter
import Redis from 'koa-redis' // Redis storage for koa session middleware/cache.
import json from 'koa-json' // JSON pretty-printed response middleware.
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'

const { Nuxt, Builder } = require('nuxt')
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

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

// post handle
app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)

// data pretty
app.use(json())

// Connect to the database
mongoose.connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  }
)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  const nuxt = new Nuxt(config) // Instantiate nuxt.js
  if (config.dev) { // Build in development
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // Introducing routing
  app.use(users.routes()).use(users.allowedMethods())
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
