# vue-sell-interview

## page

1. ratings
2. seller
3. goods
4. shopCart
5. cartControl
6. shop

## vue-awesome-swiper
**main.js**
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

## fastclick
移动端点击延迟300MS
**main.js**
import fastclick from 'fastclick'
fastclick.attach(document.body) // fastclick: mobile-end click 300MS delay

## vue-lazyload
Vue 图片延迟加载插件
**main.js**
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('../public/favicon.png')
})
**router.js**
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ 'pages/login/login.vue')
    },

## element-ui
实现表单验证
**main.js**
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

## vuex
数据共享数据存储
**main.js**
import store from 'store/vuex'
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

## vue-router
路由跳转
**main.js**
import Router from 'vue-router'
**component**
this.$router.push('/home')

## reset.css
全局重置样式

## axios
前端请求
**home.vue**
axios
  .all([axios.get('/api/home'), axios.get('/api/merchant')])
  .then(axios.spread((acc, pers) => {
    const { data } = acc.data
    const { data } = pers.data
  }))
axios
  .get('/api/home')
  .then((res) => {
    const { status, data } = res.data
  }).catch(() => {
  })
const instance = axios.create({ // craete axios instance
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`, // Environment variable host, environment variable port number
  timeout: 5000,
  headers: {}
})

## better-scroll
实现滚动功能
if (!this.scroll) {
  this.scroll = new BScroll(this.$refs.home, {
    click: true
  })
  this.scroll.on('touchend', (pos) => {
    if (pos.y > 1) {
      console.log('下拉动作')
    }
  })
} else {
  this.scroll.refresh()
}

## crypto-js
前端加密
import CryptoJS from 'crypto-js' // encryption
CryptoJS.MD5(this.password) // CryptoJS.MD5 encryption

## good-storage
一个存储库，使用相同的api支持sessionStorage和localStorage

## moment
时间格式处理
import moment from 'moment'
    formatDate(time) {
      return moment(time).format(this.dateType)
    }

## server

## mongoose
import mongoose from 'mongoose'
const Schema = mongoose.Schema // Schema: Description of the table
mongoose.model('User', UserSchema) // model create Model
// Connect to the database
mongoose.connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  }
)

## consola
import consola from 'consola' // Elegant Console Logger for Node.js and Browser
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

## koa-bodyparser
针对请求报文的处理
import bodyParser from 'koa-bodyparser' // Parsing the middleware of the body, this.body can get the data directly in koa. Post parameter acquisition
// post handle
app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)

## koa-generic-session
Koa通用的session中间件
import session from 'koa-generic-session' // supports Delay session getter
app.use(
  session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
  })
)
app.use(passport.session())

## koa-redis
用于koa会话中间件/缓存的Redis存储
import Redis from 'koa-redis' // Redis storage for koa session middleware/cache.
app.use(
  session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
  })
)

## koa-json
JSON漂亮打印响应中间件
import json from 'koa-json' // JSON pretty-printed response middleware.
// data pretty
app.use(json())

## koa-passport
import passport from 'koa-passport' // Passport middleware for Koa

## passport-local
后台用户验证
passport.use(
  passport.serializeUser(function(user, done) { // User information is retained in session, defulat
  done(null, user)
})
passport.deserializeUser(function(user, done) {
  return done(null, user)
})

import LocalStrategy from 'passport-local' // Passport strategy for authenticating with a username and password.
  new LocalStrategy(async function(username, password, done) {

## koa-router
koa 的路由库
import Router from 'koa-router'
const router = new Router({ // Routing prefix
  prefix: '/users'
})
const Store = new Redis().client // get redis client
router.post('/signup', async ctx => {

## koa-redis
koa会话中间件/缓存的Redis存储
import Redis from 'koa-redis' // Redis storage for koa session middleware/cache
const Store = new Redis().client // get redis client

## nodemailer
发送电子邮件从Node.js
import nodeMailer from 'nodemailer' // Send e-mails from Node.js – easy as cake
  const transporter = nodeMailer.createTransport({ // send email config
    host: Email.smtp.host,
    port: 587,
    secure: false, // false: Listen to other ports
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

