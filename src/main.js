import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from 'store/vuex'

import VueAwesomeSwiper from 'vue-awesome-swiper' // Carousel map
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import fastclick from 'fastclick' // eliminate mobile-end click 300MS delay
fastclick.attach(document.body)

import VueLazyload from 'vue-lazyload' // Vue image lazy loading plug-in
Vue.use(VueLazyload, {
  loading: require('../public/favicon.png')
})

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'notyf/notyf.min.css' // Pure js message notification plugin
import 'assets/reset.css'
import 'assets/stylus/index.styl'

Vue.config.productionTip = false // close Vue production tip

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0 || to.name === 'root') { // to.matched.length === 0 -> Unmatched route
    from.name ? next({ name: from.name }) : next({ path: '/login' }) // from.name -> Superior routing
  } else {
    next() // Jump
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
