import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
import './assets/scss/index.scss'
import '../static/css/reset.css'

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

fastclick.attach(document.body) // fastclick: mobile-end click 300MS delay
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('../public/favicon.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
