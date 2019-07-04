# vue-sell-interview

## 运行界面

![首页](https://i.loli.net/2019/07/04/5d1d4f015690842261.png)
![我的](https://i.loli.net/2019/07/04/5d1d4f141fb5d77037.png)
![登录](https://i.loli.net/2019/07/04/5d1d4e71ac17883368.png)
![注册](https://i.loli.net/2019/07/04/5d1d4f235b41891804.png)
![点菜](https://i.loli.net/2019/07/04/5d1d4e94a0aee27856.png)
![弹层](https://i.loli.net/2019/07/04/5d1d4e3cd2f7d33727.png)
![购物车](https://i.loli.net/2019/07/04/5d1d4eb13c15f42999.png)
![食物](https://i.loli.net/2019/07/04/5d1d4ef1a9ed494271.png)
![评价](https://i.loli.net/2019/07/04/5d1d4ec34a76c97586.png)
![商家](https://i.loli.net/2019/07/04/5d1d4ed3d288f28791.png)

## 介绍

简介：使用 react, 实现餐馆点餐 App

react 版本 "^16.8.6"
Robo 3T, Postman 管理 MongoDB 数据库, VSCode 编辑器编辑代码
利用 MongoDB 数据库管理数据，
koa2 为前端提供请求接口
stylus 编写其样式，
webpack 配置别名和代理。
element-ui 样式框架实现布局
git 管理项目

前端部分:
http-proxy-middleware 配置代理， 代理到后端接口上
react lazy & Suspense 实现代码拆分。lazy 懒加载组件, Suspense 维护子组件的 loading
react-router-dom, <BrowserRouter> 对 Router 的封装, <Switch> 将多个 <Route> 包裹在一起, <Route> 路由匹配, <Redirect> 页面重定向, <Link> 锚点连接, <NavLink> 自定义样式锚点连接, <withRouter> 函数返回一个组件。返回的组件外层是 Route
react-redux, <Provider> 为整个 App 传递 store, mapStateToProps 将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到组件上, connect() 调用 mapStateToProps, mapDispatchToProps
redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据, 项目里请求的是 koa2 提供的接口
redux, 实现数据共享, compose 开启 chrome redux 插件, applyMiddleware 将所有中间件组成一个数组，依次执行, createStore 创建 store
immutable 数据被修改时仍然能够保持修改前的状态, 省去拷贝操作, redux-immutable 提供的 combineReducers 实现 immutable, fromJS() redux 数据使其成为 immutable 数据, 组件中通过 getIn() & get() 获取 redux 的数据, reducer 里 toJS() 将 immutable 对象转原生 js, merge() 合并处理 immutable 的数据
nuka-carousel 实现图标轮播图功能
better-scroll 实现界面卷轴滚动功能
moment 评论界面的时间格式处理
axios 前端请求，后端配置了数据接口, 前端请求该接口
element-react, 实现 Layout 布局, 表单验证. 用于注册界面填写的密码，邮箱，验证码的验证功能
crypto-js 用于注册界面, 注册时输入密码需要加密传输到后端数据接口里
prop-types 对父组件传来的 props 进行检查
react-transition-group, CSSTransition 用于编写商家界面的动画
notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示

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

