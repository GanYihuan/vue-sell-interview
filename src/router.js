/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-09 02:19:17
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-21 02:19:46
 */
import Vue from 'vue'
import Router from 'vue-router' // vue 路由

Vue.use(Router) // vue 路由

export default new Router({
  routes: [
    { // 默认路由
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('pages/login/login.vue') // 异步路由根据 URL 自动加载所需页面的资源，不会导致页面阻塞
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('pages/register/register.vue')
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('pages/city/city.vue')
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: () => import('pages/navbar/navbar.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('pages/home/home.vue')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('pages/my/my.vue')
        },
        {
          path: '/order',
          name: 'order',
          props: true,
          component: () => import('pages/order/order.vue')
        },
        {
          path: '/evaluate',
          name: 'evaluate',
          component: () => import('pages/order/evaluate.vue')
        }
      ]
    },
    {
      path: '/shop',
      props: true,
      name: 'shop',
      component: () => import('pages/shop/shop.vue'),
      children: [
        {
          path: '/goods/:id', // `:id` 路由参数
          props: true, // 传输路由器参数 `:id` 到 <router-link/>, <router-link/> 可以使用 props 获得 `:id`
          name: 'goods',
          component: () => import('pages/goods/goods.vue')
        },
        {
          path: '/seller/:id',
          props: true,
          name: 'seller',
          component: () => import('pages/seller/seller.vue')
        },
        {
          path: '/ratings/:id',
          props: true,
          name: 'ratings',
          component: () => import('pages/ratings/ratings.vue')
        }
      ]
    },
    { // 出现未定义路由时
      path: '*',
      component: () => import('pages/noresult/noresult.vue')
    }
  ],
  linkActiveClass: 'active', // 当存在活动路由时, <router-link/> 添加 'className=active'
  linkExactActiveClass: 'exact-active-link', // 激活路由精确匹配, <router-link/> 添加 'className=exact-active-link'
  fallback: true, // 当浏览器不支持单页应用程序时，默认返回哈希模式，默认设置为 true，如果设置为 false，单页变成多页应用程序，费时
  mode: 'history', // 删除地址栏哈希 #
  scrollBehavior(to, from, savedPosition) { // 当路由跳转时，页面滚动到指定位置
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
