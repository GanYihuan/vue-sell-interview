import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // { // default route jump
    //   path: '/',
    //   name: 'root',
    //   redirect: '/login',
    //   component: () => import('pages/login/login.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('pages/login/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('pages/register/register.vue')
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
      path: '/shop/:id',
      props: true,
      name: 'shop',
      component: () => import('pages/shop/shop.vue'),
      children: [
        {
          path: '/goods/:id',
          props: true,
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
