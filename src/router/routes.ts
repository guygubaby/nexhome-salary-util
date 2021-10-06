import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/starnet-salary/',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/starnet-salary/detail',
    name: 'detail',
    component: () => import('@/views/detail.vue'),
  },
]

export default routes
