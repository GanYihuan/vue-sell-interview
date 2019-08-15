<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-17 10:01:17
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 23:44:22
 -->

# job

本人意向前端开发，我主要从视频教程学习技能，经常翻阅掘金的技术文章总结知识。作品是用 Vue 与 React 两个框架各编写一次的项目案例, 从中不断总结不同技术间的特点。我理解的前端开发是个不断优化的过程，坚信有足够的热情和耐心完成这份工作！

实习经历。管理公司内部的系统，该系统用于接收和发送单据，按照需求和提交单据的人沟通，转交相关的内容。文件的整理和修改文案工作。

简介：使用 vue 开发餐馆点餐 App
功能:

- 增: 点菜界面选择菜品增加到购物车里, 结算后购物车菜品添加到 mongodb. 订单界面能读取出这些购物车菜品
- 删: 订单界面删除购买到的菜品, 能删除 mongodb 里保存的数据
- 改: 修改城市能显示不同城市的商家
- 查: 选择不同城市, 能查询出 mongodb 里的城市数据
- 登录: 填写用户名和密码, 从数据库里面读取对应保存的用户名和邮箱进行登录
- 注册: 填写用户名, 密码, 邮箱后点击验证码, 发一封邮件到填写的邮箱, 输入正确的验证码后注册, mongodb 保存用户数据
- 登出: 用户界面用户名和邮箱清空

工具:
vue 版本 "^2.6.10"
Robo 3T 管理 MongoDB 数据库
Postman 查询数据
git 管理项目

样式:
粘连布局: 菜单弹出层使用粘连布局
两列自适应布局: 底部菜单栏图标布局设置
不同分辨率下的一像素线适配
2X 3X 图适配

插件:
vue-awesome-swiper 用于首页图标横幅滚动效果
fastclick 移动端点击 300MS 延迟
vue-lazyload 用于小图标延迟加载
element-ui 实现注册界面与登录界面的表单验证功能, 验证填写的用户名, 密码, 邮箱, 验证码, 这些信息作为参数传递到 koa2 后端
vue-router 实现页面间路由跳转功能, 采取了路由懒加载
notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示
axios 向后端发起请求, 请求保存在 mongodb 里面的数据
better-scroll 实现各个界面下拉滚动功能, 通过配置参数, 实现横向滚动卷轴功能, 返回顶部的功能
crypto-js 注册界面输入的密码经过 MD5 加密传输到后端数据接口
moment 用于评论界面的时间格式处理
good-storage 实现 sessionStorage 和 localStorage 功能, 用于商家界面收藏页的存储功能
vuex, state 共享时间格式数据, Mutation 修改 state 数据, 实现不同组件间"差评按钮"与"只看差评选项"的联动功能

后端：
koa2 编写后端代码
mongoose 用于连接 MongoDB, 创建 mongodb schema & model
Robo 3T 管理 mongodb 数据库内容, postman 查看请求的数据
koa-redis koa-generic-session 使用 redis session 数据库储存用户信息
nodeMailer 实现发送电子邮件验证码
koa-json koa-onerror koa-logger 实现 json 打印, koa 错误处理, koa 日志记录
koa-passport passport-local 验证用户名对应的密码验证
koa-bodyparser 针对请求报文的处理

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
