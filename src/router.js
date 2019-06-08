import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/navbar'
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
        }
      ]
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import(/* webpackChunkName: "about" */ 'pages/shop/shop.vue'),
      children: [ // <router-view></router-view> put into todo component inside, show sub-route
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
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ 'pages/seller/seller.vue')
        }
      ]
    }
  ],
  // when active, add className=active
  linkActiveClass: 'active'
})
