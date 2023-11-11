import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior: () => {
    return { top: 0 }
  },
})

export default router
