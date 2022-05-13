import { createRouter, createWebHistory } from 'vue-router';
import MainLogin from '@/components/MainAccount/LoginBase.vue'
import MainSignUp from '@/components/MainAccount/SignUpBase.vue'
import MainCalendar from '@/components/MainCalender/CalendarBase.vue'
import MainGraph from '@/components/MainGraph/GraphBase.vue'

//우리가 사용할 route 생성 및 설정
const routes = [
  {
    path: '/',
    name: 'homeAndLogin',
    component: MainLogin,
  },
  {
    path: '/login',
    name: 'login',
    redirect: '/'
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: MainSignUp
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: MainCalendar,
  },
  {
    path: '/graph',
    name: 'graph',
    component: MainGraph
  }
];

//VueRouter에 route를 등록하고 설정한다.
const router = createRouter({
  history: createWebHistory(),
  routes
})

//설정한 VueRouter 내보낸다.
export default router;