import { createRouter, createWebHistory } from 'vue-router'

// Import admin dashboard view
import Dashboard from '@/views/admin/dashboard/Dashboard.vue'

const routes = [
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: Dashboard,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
