/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-09 02:19:17
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 04:39:58
 */
import Vue from 'vue'
import App from './App.vue' // 渲染组件
import router from './router' // 路由
import store from 'store/vuex' // vuex 数据
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播图
import fastclick from 'fastclick' // 300 ms 延迟 双击时的间隔
import VueLazyload from 'vue-lazyload' // 图片懒加载
import ElementUI from 'element-ui' // element-ui 组件
import 'element-ui/lib/theme-chalk/index.css' // element-ui 组件
import 'swiper/dist/css/swiper.css' // vue-awesome-swiper 轮播图
import 'notyf/notyf.min.css' // 提示插件
import 'assets/reset.css' // 强制每个浏览器将其所有样式重置，从而尽可能避免跨浏览器的差异
import 'assets/stylus/index.styl'

fastclick.attach(document.body) // 300 ms 延迟 双击时的间隔
Vue.use(VueAwesomeSwiper) // vue-awesome-swiper 轮播图
Vue.use(VueLazyload, { // vue-lazyload 图片懒加载
  loading: require('../public/favicon.png')
})
Vue.use(ElementUI) // element-ui 组件
Vue.config.productionTip = false // 关闭 vue 开发提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
