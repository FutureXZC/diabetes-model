import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/predict',
      component: Layout,
      children: [
        {
          path: 'predict',
          component: () => import('@/views/predict')
        },
        {
          path: 'map',
          component: () => import('@/views/graph')
        },
        {
          path: 'history',
          component: () => import('@/views/history')
        }
      ]
    },
  ]
})
