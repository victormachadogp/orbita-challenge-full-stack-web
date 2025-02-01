import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentFormView from '@/views/StudentFormView.vue'
import StudentListView from '@/views/StudentListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/student-form',
      name: 'StudentForm',
      component: StudentFormView,
    },
    {
      path: '/student-form/:id',
      name: 'StudentView',
      component: StudentFormView,
      props: true,
    },
    {
      path: '/students',
      name: 'Students',
      component: StudentListView,
    },
  ],
})

export default router
