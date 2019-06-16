# vue-sell-interview

## page

1. ratings
2. seller
3. goods
4. shopCart
5. cartControl

## vue-awesome-swiper
**main.js**
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

## fastclick
**main.js**
import fastclick from 'fastclick'
fastclick.attach(document.body) // fastclick: mobile-end click 300MS delay

## vue-lazyload
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
**main.js**
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

## vuex
**main.js**
import store from 'store/vuex'
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

## vue-router
**main.js**
import Router from 'vue-router'
**component**
this.$router.push('/home')

## reset.css

## axios
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

## better-scroll
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
import CryptoJS from 'crypto-js' // encryption
CryptoJS.MD5(this.password) // CryptoJS.MD5 encryption

## good-storage

## moment
import moment from 'moment'
    formatDate(time) {
      return moment(time).format(this.dateType)
    }
