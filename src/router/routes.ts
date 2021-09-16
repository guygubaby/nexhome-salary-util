import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail.vue'),
  },
]

export default routes
