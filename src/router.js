import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('pages/login/login.vue') // Asynchronous routing, which automatically loads the resources of the required page based on the URL, does not cause the page to block
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
    },
    {
      path: '*',
      component: () => import('pages/noresult/noresult.vue')
    }
  ],
  linkActiveClass: 'active', // When there is an active route, <router-link/> add `className=active-link`
  linkExactActiveClass: 'exact-active-link', // Activate route exact match `/login/exact` <router-link/> add `className=exact-active-link`
  fallback: true, // When the browser does not support single page applications, Default return hash mode, Default setting true, If set to false, Single page becomes a multi-page application, time consuming
  mode: 'history', // Remove address bar hash #
  scrollBehavior(to, from, savedPosition) { // Page scrolls to the specified location when the route jumps
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
