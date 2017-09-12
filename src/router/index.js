import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods/Goods'  //@是一个变量，表示src目录
import Ratings from '@/components/Ratings/Ratings'
import Seller from '@/components/Seller/Seller'
import Ele from '@/components/Ele/Ele'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/ele',
        name: 'Ele',
        component: Ele
     },
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
  ]
})
