import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store/vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播图实现，首页的轮播图实现滚动的图标效果
import fastclick from 'fastclick' // fastclick: 移动端点击延迟300MS
import VueLazyload from 'vue-lazyload' // 图片延迟加载插件，实现标志图片的加载
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import './assets/scss/index.scss'
import '../static/css/reset.css'

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)

fastclick.attach(document.body)
// Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('../public/favicon.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
