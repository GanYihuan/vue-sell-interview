import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { // default route jump
      path: '/',
      redirect: '/my'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ 'pages/login/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ 'pages/register/register.vue')
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: () => import(/* webpackChunkName: "about" */ 'pages/navbar/navbar.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "about" */ 'pages/home/home.vue')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import(/* webpackChunkName: "about" */ 'pages/my/my.vue')
        },
        {
          path: '/evaluate',
          name: 'evaluate',
          component: () => import(/* webpackChunkName: "about" */ 'pages/evaluate/evaluate.vue')
        }
      ]
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import(/* webpackChunkName: "about" */ 'pages/shop/shop.vue'),
      children: [
        {
          path: '/goods',
          name: 'goods',
          component: () => import(/* webpackChunkName: "about" */ 'pages/goods/goods.vue')
        },
        {
          path: '/ratings',
          name: 'ratings',
          component: () => import(/* webpackChunkName: "about" */ 'pages/ratings/ratings.vue')
        },
        {
          path: '/seller',
          name: 'seller',
          component: () => import(/* webpackChunkName: "about" */ 'pages/seller/seller.vue')
        }
      ]
    }
  ],
  linkActiveClass: 'active', // when active, add className=active
  mode: 'history', // Remove the hash of the address bar #
  scrollBehavior(to, from, savedPosition) { // Page scrolls to the specified location when the route jumps
    if (savedPosition) {
      return savedPosition
    } else {
      return { // Specified location
        x: 0,
        y: 0
      }
    }
  }
})
