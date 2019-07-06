import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store/vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播图实现，首页的轮播图实现滚动的图标效果
import fastclick from 'fastclick' // fastclick: 移动端点击延迟300MS
import VueLazyload from 'vue-lazyload' // 图片延迟加载插件，实现标志图片的加载
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'notyf/notyf.min.css'
import 'swiper/dist/css/swiper.css'
import 'assets/stylus/index.styl'
import 'assets/reset.css'

fastclick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.config.productionTip = false // close Vue production tip
Vue.use(VueLazyload, {
  loading: require('../public/favicon.png')
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0 || to.name === 'root') { // 如果未匹配到路由
    from.name ? next({ name: from.name }) : next({ path: '/login' }) // 如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next() // 如果匹配到正确跳转
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
