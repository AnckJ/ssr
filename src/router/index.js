import Router from 'vue-router'
import Vue from 'vue'
import Test from '@/views/test.vue'

Vue.use(Router)

export default () => {
  return new Router({
    routes: [
      {
        path: '/',
        redirect: '/test'
      },
      {
        path: '/test',
        component: Test
      },
      {
        path: '/login',
        component: () => import('@/views/login/login.vue')
      }
    ]
  })
}
