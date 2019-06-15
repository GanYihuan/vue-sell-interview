# vue-sell-interview

**main.js**
**router.js**
vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

fastclick
fastclick.attach(document.body) // fastclick: mobile-end click 300MS delay

vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('../public/favicon.png')
})
component: () => import(/* webpackChunkName: "about" */ 'pages/login/login.vue')

element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

vuex
import store from 'store/vuex'

vue-router
import Router from 'vue-router'
